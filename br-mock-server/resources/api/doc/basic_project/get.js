'use strict';

const basic_project = require('entity/new/project_basic');

module.exports = function(req, res, next) {

  res.send(basic_project);
  next();
};
