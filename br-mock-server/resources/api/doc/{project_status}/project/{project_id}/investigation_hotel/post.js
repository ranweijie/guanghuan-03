'use strict';

const Hotel = require('entity/hotel');
const Project = require('entity/new/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    const hotel = Hotel.getHotelList()[0]
    res.send(201, Object.assign({}, hotel, { project_id: Project._id }));
  } else {
    res.send(404);
  }
  next();
};
