const Project = require('entity/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project._id) {
    res.send(201);
  } else {
    res.send(404);
  }
  next();
};
