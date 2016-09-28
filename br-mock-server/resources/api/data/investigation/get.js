'use strict';

const Investigation = require('entity/investigation');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    res.send([Object.assign({}, Investigation, {project_id: Project._id})]);
  } else {
    res.send(404);
  }
  next();
};
