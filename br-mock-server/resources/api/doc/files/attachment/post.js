
const Attachment = require('entity/new/attachment');

module.exports = function (req, res, next) {
  res.send(201, Attachment)
  next()
}
