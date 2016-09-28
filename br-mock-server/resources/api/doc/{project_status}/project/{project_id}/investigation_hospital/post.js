'use strict';

const Hospital = require('entity/hospital');
const Project = require('entity/new/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    const currentHospital = Hospital.getHospitalList()[0]
    res.send(Object.assign({}, currentHospital, { project_id: Project.id }));
  } else {
    res.send(404);
  }
  next();
};
