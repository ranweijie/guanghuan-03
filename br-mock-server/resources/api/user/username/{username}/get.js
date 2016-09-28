

module.exports = function(req, res, next) {
  if (req.username === 'liuliu') {
    res.send(204);
  } else {
    res.send(404);
  }
  next();
};
