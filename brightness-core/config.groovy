environments {
    dev {
        db {
            host = ''
            url = ""
            user = 'root'
            password = ''
            schemas = 'brightness'
        }
    }

    test {
        db {
            host = ''
            url = ""
            user = 'root'
            password = ''
            schemas = 'brightness'
        }
    }

    local {
        db {
            host = 'localhost'
            url = "jdbc:mysql://localhost:3306"
            user = 'root'
            password = ''
            schemas = 'brightness'
        }
    }
}
