'use strict';

const LaunchCeremony = require('entity/launch_ceremony');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project.id) {
    res.send([Object.assign({}, LaunchCeremony, {project_id: Project.id})]);
  } else {
    res.send(404);
  }
  next();
};
