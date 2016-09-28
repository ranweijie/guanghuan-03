'use strict';

const _ = require('lodash');

const Attachment = require('entity/new/attachment');

module.exports = function(req, res, next) {

  res.send([
    Object.assign({}, Attachment, {name: '财务预算1'}, {_id: '1'}),
    Object.assign({}, Attachment, {name: '财务预算2'}, {_id: '2'})
  ]);
  next();
};
