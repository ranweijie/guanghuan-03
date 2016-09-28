import angular from 'angular'

import Token from './token'
import WechatToken from './wechat-token'
import FormData from './formdata'
import User from './user'
import Attachment from './attachment'
import RoleFromServer from './roleFromServer'

export default angular
  .module(__filename, [])
  .factory('Token', Token)
  .factory('WechatToken', WechatToken)
  .factory('User', User)
  .factory('FormData', FormData)
  .factory('Attachment', Attachment)
  .factory('RoleFromServer', RoleFromServer)
