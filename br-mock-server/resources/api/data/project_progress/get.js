'use strict';

const Project = require('entity/project');
const ProjectProgress = require('entity/project-progress');

module.exports = function(req, res, next) {
  if (req.params.project_id === Project.id) {
    res.send([Object.assign({}, ProjectProgress, {project_id: Project.id})]);
  } else {
    res.send(404);
  }
  next();
};
