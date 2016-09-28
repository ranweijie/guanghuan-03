const OperationSurvey = require('entity/check_before_operation');
const Project = require('entity/project');

module.exports = function (req, res, next) {
  if (req.params.project_id === Project.project_id) {
    res.send(OperationSurvey);
  } else {
    res.send(404);
  }
  next();
};
