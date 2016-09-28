'use strict';

const _ = require('lodash');

const Project = require('entity/project');
const projectProperties = ['_id', 'name', 'schedule', 'location'];

module.exports = function(req, res, next) {
  res.send(_.pick(Project, projectProperties));
  next();
};
