'use strict';

const Hotel = require('entity/hotel');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  const currentHotel = Hotel.getHotelList().filter((hospital) => hospital._id === req.params.id)[0]
  if (currentHotel) {
    res.send([Object.assign({}, currentHotel, { project_id: Project._id })]);
  } else {
    res.send(404);
  }
  next();
};
