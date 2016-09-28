'use strict';

const _ = require('lodash');

const Schedule = require('entity/new/project_schedule');

module.exports = function(req, res, next) {

  const scheduleList = [Schedule,
    Object.assign({}, Schedule, {category: 1003}),
    Object.assign({}, Schedule, {category: 1003})
  ]

  res.send(Object.assign({}, {_items: scheduleList}));
  next();
};
