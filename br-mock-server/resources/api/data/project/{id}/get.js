'use strict';

const Project = require('entity/project');

module.exports = function(req, res, next) {
  if (req.params.id === Project.id) {
    res.send([Project]);
  } else {
    res.send(404);
  }
  next();
};
