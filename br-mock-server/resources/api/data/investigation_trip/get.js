'use strict';

const Trip = require('entity/trip');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    const tripList = Trip.getTripList()
    res.send(tripList.map((trip) => Object.assign({}, trip, { project_id: Project._id })));
  } else {
    res.send(404);
  }
  next();
};
