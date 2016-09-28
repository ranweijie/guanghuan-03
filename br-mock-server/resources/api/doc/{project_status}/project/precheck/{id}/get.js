'use strict';

const _ = require('lodash')
const Project = require('entity/new/project');

module.exports = function(req, res, next) {

  res.send(_.pick(Project, ['_id', 'precheck']));
  next();
};
