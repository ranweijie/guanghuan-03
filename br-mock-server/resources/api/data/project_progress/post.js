'use strict';

const Project = require('entity/project');
const ProjectProgress = require('entity/project-progress');

module.exports = function(req, res, next) {
  if (invalidInputText(req.params.hotel_name)) {
    res.send(422, {message: 'illegal_character'});
  } else {
    res.send(201, Object.assign({}, ProjectProgress, {project_id: Project.project_id}));
  }
  next();
};

function invalidInputText(input) {
  return /[%!@]/g.test(input);
}
