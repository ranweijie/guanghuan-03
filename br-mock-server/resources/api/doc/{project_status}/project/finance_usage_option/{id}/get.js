'use strict';

module.exports = function(req, res, next) {

  res.send(['早餐', '车费']);
  next();
};
