'use strict';

const Hospital = require('entity/hospital');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  const currentHospital = Hospital.getHospitalList().filter((hospital) => hospital._id === req.params.id)[0]
  if (currentHospital) {
    res.send([Object.assign({}, currentHospital, { project_id: Project.id })]);
  } else {
    res.send(404);
  }
  next();
};
