'use strict';

const _ = require('lodash');

const Project = require('entity/project_basic');

module.exports = function(req, res, next) {

  res.send([Project,
    Object.assign({}, Project, {status: 'in_progress'}, {name: '西藏光明行'}),
    Object.assign({}, Project, {status: 'archive'}, {name: '非洲光明行'}),
    Object.assign({}, Project, {status: 'end'}, {name: '非洲光明行'})
  ]);
  next();
};
