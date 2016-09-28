'use strict';

const Project = require('entity/project');

module.exports = function(req, res, next) {
  res.send([Project]);
  next();
};
