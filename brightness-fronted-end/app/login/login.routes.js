import LoginController from './login.controller'
import loginTemplate from 'raw!./login.html'
import WechatLoginController from './wechat-login.controller'

export default ($stateProvider) => {
  'ngInject'
  $stateProvider
    .state('login', {
      url: '/login',
      template: loginTemplate,
      controller: LoginController,
      controllerAs: 'vm',
      data: {
        unlogin: true
      }
    })
    .state('wechat-login', {
      url: '/wechat-login',
      template: '<span></span>',
      controller: WechatLoginController,
      controllerAs: 'vm'
    })
}
