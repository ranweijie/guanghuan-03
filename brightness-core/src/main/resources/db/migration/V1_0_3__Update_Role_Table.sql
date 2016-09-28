set names utf8;

UPDATE role SET role_name='志愿者' WHERE role_code='ROLE_VOLUNTEER';

INSERT INTO role(role_code, role_name) VALUES ('ROLE_CSR_LEAD', '光明行负责人');
INSERT INTO role(role_code, role_name) VALUES ('ROLE_LEAD', '集团领导');
INSERT INTO role(role_code, role_name) VALUES ('ROLE_OTHER_MEMBER', '其他部门工作人员');
INSERT INTO role(role_code, role_name) VALUES ('ROLE_FINANCIER', '财务专员');