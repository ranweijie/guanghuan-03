'use strict';

const _ = require('lodash');

const Participant = require('entity/new/project_participant');

module.exports = function(req, res, next) {

  const participantList = [Participant,
    Object.assign({}, Participant, {is_team_leader: true}),
    Object.assign({}, Participant, {category: 1001}),
    Object.assign({}, Participant, {category: 1001}, {is_team_leader: true}),
    Object.assign({}, Participant, {category: 1003}),
    Object.assign({}, Participant, {category: 1003}),
    Object.assign({}, Participant, {category: 1003}, {is_team_leader: true})
  ]

  res.send(Object.assign({}, {_items: participantList}));
  next();
};
