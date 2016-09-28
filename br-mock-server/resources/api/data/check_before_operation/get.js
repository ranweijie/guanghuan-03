'use strict';

const OperationSurvey = require('entity/check_before_operation');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project.id) {
    res.send([Object.assign({}, OperationSurvey, {project_id: Project.id})]);
  } else {
    res.send(404);
  }
  next();
};
