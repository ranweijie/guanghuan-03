CREATE TABLE user (
  user_id          INT          NOT NULL AUTO_INCREMENT,
  username         VARCHAR(20)  NOT NULL,
  password         VARCHAR(100) NOT NULL,
  realname         VARCHAR(50),
  email            VARCHAR(50),
  wechat_uuid      VARCHAR(100),
  mobile           VARCHAR(20),
  role_code        VARCHAR(30)  NOT NULL,
  create_time      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY pk_user (user_id),
  UNIQUE KEY uk_user_name (username),
  FOREIGN KEY fk_user_role_code(role_code) REFERENCES role (role_code)
) DEFAULT CHARACTER SET utf8;

INSERT INTO user (username, password, role_code)
VALUES ('admin', '$2a$10$LLqJn22ubREGcDEFczYlyu0zC3kf9v2opuCHd8HTyiqfCxz7lSRhq', 'ROLE_ADMIN');