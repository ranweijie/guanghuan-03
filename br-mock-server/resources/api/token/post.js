'use strict';
const User = require('entity/user'),
  token = require('entity/token');

module.exports = function(req, res, next) {

  const user = User.getByName(req.params.username);

  if (user && user.roleCode) {
    res.send(201, {'user': user, 'token': token});
  } else {
    // Unauthorized
    res.send(401, user);
  }
  next();
};
