'use strict';

const TeamContact = require('entity/team-contact');
const Project = require('entity/project');

module.exports = function(req, res, next) {
  if (req.params.project_id === Project.id) {
    res.send([Object.assign({}, TeamContact, { project_id: Project.id })]);
  } else {
    res.send(404);
  }
  next();
};
