'use strict';


const USER_SCHEMA = {
  'userId': null,
  'username': null,
  'mobile': null,
  'email': null,
  'realname': null,
  'roleCode': null,
  'wechatUuid': null
};

//
const NormalUser = {
  admin: Object.assign({}, USER_SCHEMA, {
    'userId': 1,
    'username': 'admin',
    'roleCode': 'ROLE_ADMIN'
  }),
  wangrui: Object.assign({}, USER_SCHEMA, {
    'userId': 2,
    'username': 'wangrui',
    'roleCode': 'ROLE_CSR'
  }),
  nima: Object.assign({}, USER_SCHEMA, {
    'userId': 3,
    'username': 'nima',
    'roleCode': 'ROLE_VOLUNTEER'
  }),
  csrlead: Object.assign({}, USER_SCHEMA, {
    'userId': 4,
    'username': 'csrlead',
    'roleCode': 'ROLE_CSR_LEAD'
  }),
  caiwu: Object.assign({}, USER_SCHEMA, {
    'userId': 5,
    'username': 'caiwu',
    'roleCode': 'ROLE_FINANCIER'
  }),
  hnaleader: Object.assign({}, USER_SCHEMA, {
    'userId': 7,
    'username': 'hnaleader',
    'roleCode': 'ROLE_LEAD'
  })

};

const WeChatUsers = {
  wechat: Object.assign({}, USER_SCHEMA, {
    'userId': 'userId-wechat',
    'username': 'wechat',
    'roleCode': 'ROLE_VOLUNTEER'
  }),
  'wechat-confilict': Object.assign({}, USER_SCHEMA),
  'wechat-no-token': Object.assign({}, USER_SCHEMA)
};


// Unauthorized Users
const ErrorUsers = {
  'credentials': {
    message: 'invalid_credentials'
  },
  'token_not_same': {
    message: 'token_not_same'
  }
};


module.exports = {
  getByName: function(username) {
    if (NormalUser[username]) {
      return NormalUser[username];
    }
    if (ErrorUsers[username]) {
      return ErrorUsers[username];
    }
    if (WeChatUsers[username]) {
      return WeChatUsers[username];
    }
  }
};
