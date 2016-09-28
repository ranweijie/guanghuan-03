'use strict';

const Hospital = require('entity/hospital');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    const hospitalList = Hospital.getHospitalList()
    res.send(hospitalList.map((hospital) => Object.assign({}, hospital, { project_id: Project._id })));
  } else {
    res.send(404);
  }
  next();
};
