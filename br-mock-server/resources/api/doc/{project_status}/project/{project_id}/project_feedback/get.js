'use strict';

const Feedback = require('entity/feedback');

module.exports = function(req, res, next) {
  const feedbackList = Feedback.getFeedbackList()
  res.send(Object.assign({}, {_items: feedbackList}));
  next();
};
