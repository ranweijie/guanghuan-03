'use strict';

const TeamContact = require('entity/team-contact');

module.exports = function(req, res, next) {
  if (req.params.id === '201601') {
    res.send(Object.assign({}, TeamContact, {project_id: '201601'}));
  } else {
    res.send(404);
  }
  next();
};
