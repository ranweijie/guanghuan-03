'use strict';

const Finance = require('entity/new/finance');

module.exports = function(req, res, next) {

  res.send(Finance);
  next();
};
