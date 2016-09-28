'use strict';

const ProjectSchedule = require('entity/project-schedule');
const Project = require('entity/project');

module.exports = function(req, res, next) {
  if (req.params.project_id === Project.id && !req.params.category) {
    if (req.params.date == '2016-07-08') {
      res.send([ProjectSchedule[0],ProjectSchedule[2]]);
    } else {
      res.send([ProjectSchedule[1]]);
    }
  } else if (req.params.project_id === Project.id && req.params.category) {
    let schedule;
    ProjectSchedule.forEach(function(item) {
      if (item.category == req.params.category && item.date == req.params.date) {
        schedule = item;
      }
    })
    if (schedule) {
      res.send([schedule]);
    } else {
      res.send([]);
    }
  } else {
    res.send(404);
  }
  next();
};
