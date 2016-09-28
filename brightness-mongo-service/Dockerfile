FROM python:2.7.12
RUN [ "apt-get", "install", "-y", "libffi-dev", "wget"]
COPY requirements.txt /tmp/requirements.txt
RUN [ "pip", "install", "-r", "/tmp/requirements.txt" ]
WORKDIR /root
COPY run.py run.py
CMD python run.py
