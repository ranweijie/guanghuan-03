'use strict';

const Hotel = require('entity/hotel');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    const hotelList = Hotel.getHotelList()
    res.send(hotelList.map((hospital) => Object.assign({}, hospital, { project_id: Project._id })));
  } else {
    res.send(404);
  }
  next();
};
