'use strict';

const user = require('entity/user');

module.exports = function(req, res, next) {
  res.send(200, user.getByName('wangrui'));
  next();
};
