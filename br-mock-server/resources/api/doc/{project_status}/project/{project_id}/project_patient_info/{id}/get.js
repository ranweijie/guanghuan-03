'use strict';

const Patient = require('entity/project_patient_info');
const Project = require('entity/new/project');

module.exports = function (req, res, next) {
  const currentPatient = Patient.getPatientList().filter((patient) => patient._id === req.params.id)[0]
  if (currentPatient) {
    res.send(Object.assign({}, currentPatient, { project_id: Project.id }));
  } else {
    res.send(404);
  }
  next();
};
