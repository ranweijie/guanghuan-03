'use strict';

const _ = require('lodash');

const Progress = require('entity/new/project_progress');

module.exports = function(req, res, next) {

  res.send(Object.assign({}, {_items: [Progress]}));
  next();
};
