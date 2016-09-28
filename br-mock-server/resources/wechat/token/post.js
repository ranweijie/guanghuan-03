'use strict';

const _ = require('lodash');

const User = require('entity/user'),
  token = require('entity/token'),
  wechatToken = require('./_wechat-token');

module.exports = function(req, res, next) {
  const user = User.getByName(req.params.username);

  if (req.params.username === 'wechat') {
    res.send(201, {user: user, token: token, wechat_token: wechatToken, message: null});
  } else if (req.params.username === 'wechat-confilict') {
    res.send(201, {user: user, token: token, wechat_token: wechatToken, message: 'wechat_occupied_by_other_user'});
  } else if (req.params.username === 'wechat-no-token') {
    res.send(201, {user: user, token: token, wechat_token: null, message: null});
  }
  next();
};
