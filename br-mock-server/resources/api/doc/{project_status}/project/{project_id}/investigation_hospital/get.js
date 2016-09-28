'use strict';

const Hospital = require('entity/hospital');
const Project = require('entity/new/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    const hospitalList = Hospital.getHospitalList().map((hospital) => Object.assign({}, hospital, { project_id: Project._id }))
    res.send(Object.assign({}, { _items: hospitalList }))
  } else {
    res.send(404);
  }
  next();
};
