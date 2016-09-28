'use strict';

const Hotel = require('entity/hotel');
const Project = require('entity/new/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    const hotelList = Hotel.getHotelList().map((hotel) => Object.assign({}, hotel, { project_id: Project._id }))
    res.send(Object.assign({}, { _items: hotelList }))
  } else {
    res.send(404);
  }
  next();
};
