'use strict';

const Trip = require('entity/trip');
const Project = require('entity/new/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    const tripList = Trip.getTripList().map((trip) => Object.assign({}, trip, { project_id: Project._id }))
    res.send(Object.assign({}, { _items: tripList }))
  } else {
    res.send(404);
  }
  next();
};
