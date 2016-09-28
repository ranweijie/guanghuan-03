'use strict';

const Participant = require('entity/participant');

module.exports = function(req, res, next) {
  res.send(201, Object.assign({}, Participant, {project_id: '201601'}));
  next();
};
