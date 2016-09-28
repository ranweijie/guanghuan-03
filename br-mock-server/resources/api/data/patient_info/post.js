'use strict';

const PatientInfo = require('entity/patient-info');

module.exports = function(req, res) {
  res.send(201, Object.assign({}, PatientInfo, {project_id: '201601'}));
};
