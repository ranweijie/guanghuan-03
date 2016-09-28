const ErrorCode = {
  session_expired: '会话超时，请重新登录',
  operation_forbidden: '权限不足',
  invalid_credentials: '用户名或密码错误',
  invalid_validationCode: '验证码错误',
  illegal_character: '您输入的文字中包含非法字符（如半角符号等），请检查更正后重新提交。',
  wechat_occupied_by_other_user: '您当前要绑定的光明行帐号已被其他微信帐号绑定，请更换帐号或者联系管理员',
  account_not_match_current_wechat: '您正在使用的光明行帐号并非您绑定的帐号',
  invalid_old_password: '原始密码输入错误',
  illegal_password: '密码必须由6-16位的数字，大小写字母或下划线组成',
  user_creation_illegal_format: '创建用户的数据格式不合法',
  duplicated_user_name: '用户名已存在',
  current_project_status_changed: '当前项目状态发生变更，请重新选择项目'
}
export default ErrorCode
