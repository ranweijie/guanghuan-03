'use strict';

const Patient = require('entity/project_patient_info');
const Project = require('entity/new/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    const patientList = Patient.getPatientList().map((patient) => Object.assign({}, patient, { project_id: Project._id }))
    res.send(Object.assign({}, { _items: patientList }))
  } else {
    res.send(404);
  }
  next();
};
