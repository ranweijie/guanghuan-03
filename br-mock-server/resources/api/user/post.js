'use strict';
const user = require('entity/user');

module.exports = function(req, res, next) {
  let data = user.getByName('wangrui')
  data.realname = '124'
  res.send(201, data);
  next();
};
