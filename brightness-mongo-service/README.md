
# Local运行Eve步骤

pip install -r requirments.txt

python run.py

默认使用 ‘mongodb://localhost:27017/brightness’ 连接 mongo，你可以在run.py直接修改MONGO_URI_DEFAULT的值，或者将mongo URI设置在环境变量MONGO_URI中


# 启动时获取 MONGO URI 的逻辑及顺序

1. Form environment variable "MONGO_URI"

2. From VAULT if following variables are provided in system environment:

      VAULT\_ADDR & VAULT\_TOKEN

      MONGO\_URI\_PATH\_IN\_VAULT ( eg: '/v1/secret/HNA-Brightness/prod/mongo/url' )

3. Default mongo uri : 'mongodb://localhost:27017/brightness'


# 修改run.py 后的部署

## 部署到Dev及Test环境

Build new Eve docker image

    git clone [this repo]

    cd brightness-mongo-service

    docker build -t xa-brightness-1.chinacloudapp.cn:5001/brightness/eve:v`date +%y%m%d` .

Test image

    export EVE_IMG_ID=xa-brightness-1.chinacloudapp.cn:5001/brightness/eve:v`date +%y%m%d`

    touch /var/log/eve.log
    docker run -d -p 5000:5000 -v /var/log/eve.log:/root/eve.log ${EVE_IMG_ID} > EVE_CONTAINER_ID.txt
    curl http://localhost:5000/
    cat /var/log/eve.log
    # curl should reponse with http 200 code with json content (supporting endpoints)
    # /var/log/eve.log should contain log of Eve

    docker stop `cat EVE_CONTAINER_ID.txt`
    docker rm `cat EVE_CONTAINER_ID.txt`

    ## Other commands to address issue:
        docker run -i -t ${EVE_IMG_ID} /bin/bash
        docker run -i -t -p 5000:5000 -v /var/log/eve.log:/root/eve.log ${EVE_IMG_ID}

Push image

    docker login xa-brightness-1.chinacloudapp.cn:5000

    docker push ${EVE_IMG_ID}

    docker tag -f ${EVE_IMG_ID} xa-brightness-1.chinacloudapp.cn:5001/brightness/eve:latest

    docker push xa-brightness-1.chinacloudapp.cn:5001/brightness/eve:latest

Upgrade corresponding eve container with the new build image


## 部署到Prod环境

1. 拷贝 run.py 到服务器的 /opt/eve/ 目录

2. 重启eve： sudo supervisorctl restart eve

### 新服务器环境准备步骤：

1. 将 run.py 和 requirements.txt 拷贝到产品服务器 （或者直接创建空文件然后将内容粘贴过去）

2. 安装python和依赖（推荐2.7.x版本，3.x版本没有测试过）

    sudo apt-get install python

    sudo apt-get install libffi-dev, python-dev, python-pip

    sudo pip install -r requirments.txt

    在网络访问受限的服务器上，需要手动从pypi下载所有依赖包并按照如下顺序执行pip install进行安装：
        pip install Cerberus-0.9.2.tar.gz
        pip install Events-0.2.1.tar.gz
        pip install simplejson-3.8.2.tar.gz
        pip install werkzeug-0.11.3.tar.gz
        pip install itsdangerous-0.24.tar.gz
        pip install MarkupSafe-0.23.tar.gz
        pip install Jinja2-2.8.tar.gz
        pip install flask-0.10.1.tar.gz
        pip install pymongo-3.2.2.tar.gz
        pip install Flask-PyMongo-0.4.1.tar.gz
        pip install Eve-0.6.4.tar.gz


3. 使用supervisor管理Eve启动和运行

    sudo apt-get install -y supervisor

    sudo vi /etc/supervisor/conf.d/eve.conf
        [program:eve]
        directory=/opt/eve
        environment=VAULT_ADDR="vault_server_address_and_port_here",VAULT_TOKEN="your_vault_token_here",MONGO_URI_PATH_IN_VAULT="/v1/secret/HNA-Brightness/prod/mongo/url"
        command=python run.py
        autostart=true
        autorestart=true

    sudo supervisorctl update

    sudo supervisorctl stop/start/restart eve

