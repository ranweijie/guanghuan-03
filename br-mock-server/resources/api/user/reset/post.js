'use strict';

module.exports = function(req, res, next) {
  if (req.body instanceof Array) {
    res.send(202);
  } else {
    res.send(404)
  }
  next();
};
