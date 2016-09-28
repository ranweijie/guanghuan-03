'use strict';

const user = require('entity/user');
const userList = [];

userList.push(user.getByName('wangrui'));
userList.push(user.getByName('admin'));
userList.push(user.getByName('nima'));

module.exports = function(req, res, next) {
  res.send(200, userList);
  next();
};
