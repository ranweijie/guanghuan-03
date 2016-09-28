CREATE TABLE role (
  role_code VARCHAR(30) NOT NULL,
  role_name VARCHAR(50) NOT NULL,
  PRIMARY KEY pk_role (role_code)
) DEFAULT CHARACTER SET utf8;


INSERT INTO role(role_code, role_name) values('ROLE_ADMIN', 'Admin');
INSERT INTO role(role_code, role_name) values('ROLE_VOLUNTEER', 'Volunteer');
INSERT INTO role(role_code, role_name) values('ROLE_CSR', 'CSR');

