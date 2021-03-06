'use strict';

const Trip = require('entity/trip');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  const currentTrip = Trip.getTripList().filter((trip) => trip._id === req.params.id)[0]
  if (currentTrip) {
    res.send([Object.assign({}, currentTrip, { project_id: Project._id })]);
  } else {
    res.send(404);
  }
  next();
};
