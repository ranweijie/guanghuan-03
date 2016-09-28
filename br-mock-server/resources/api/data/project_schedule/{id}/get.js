'use strict';

const ProjectSchedule = require('entity/project-schedule');

module.exports = function(req, res, next) {
  if (req.params.id === '201601') {
    res.send(Object.assign({}, ProjectSchedule, {project_id: '201601'}));
  } else {
    res.send(404);
  }
  next();
};
