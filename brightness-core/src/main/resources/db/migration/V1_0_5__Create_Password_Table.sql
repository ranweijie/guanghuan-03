CREATE TABLE password (
  user_id          INT          NOT NULL,
  encoded_password         VARCHAR(100) NOT NULL,
  create_time      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY pk_password (user_id),
  FOREIGN KEY fk_password_user_id(user_id) REFERENCES user (user_id)
) DEFAULT CHARACTER SET utf8;