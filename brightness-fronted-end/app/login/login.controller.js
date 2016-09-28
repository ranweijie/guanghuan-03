import _ from 'lodash'
import Cookie from 'js-cookie'
import {openInWeixin} from 'root/constant/is'
import ErrorCode from 'root/constant/error-code'
import './login.scss'
import Roles from 'root/constant/roles'

export default function ($element, $scope, $state, $q, Token, WechatToken, LoginUser, ConfirmModal, LocalStorage) {
  'ngInject'

  let vm = this

  const VALIDATION_CODE_TOKEN = 'VALIDATION_CODE_TOKEN'

  $scope.mobileLogo = require('root/images/logo-mobile.png')
  $scope.headBg = require('../../images/head-bg.png')
  $scope.logo = require('../../images/logo.png')
  vm.background = require('root/images/bg.jpg')

  vm.inputPattern = '([A-Za-z0-9\-\_]+)'

  vm.refreshValidationCode = getValidationCode

  getValidationCode()

  vm.login = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    login()
      .then(persistToken, tokenErrorHandler)
      .then(goToHomePage)
  }

  vm.invalidForm = (form) => {
    if (invalidEmpty(form)) {
      vm.errorMsg = '用户名，密码，验证码不能为空'
      return true
    }

    if (invalidPattern(form)) {
      vm.errorMsg = '用户名和密码只能包含数字字母“-”和“_”'
      return true
    }
  }

  // privates
  function getValidationCode () {
    vm.validationCodeUrl = '/api/validation-code?' + new Date().getTime()
  }

  function invalidPattern (form) {
    return (form.username.$dirty && form.username.$error.pattern) ||
      (form.password.$dirty && form.password.$error.pattern)
  }

  function invalidEmpty (form) {
    const {username, password, validationCode} = form
    return ((username.$dirty || form.$submitted) && username.$error.required) ||
      ((password.$dirty || form.$submitted) && form.password.$error.required) ||
      ((validationCode.$dirty || form.$submitted) && validationCode.$error.required)
  }

  // 登录
  function login () {
    const params = {
      username: vm.data.username,
      password: btoa(vm.data.password),
      validationCode: vm.data.validationCode
    }

    if (openInWeixin) {
      return WechatToken.save(params).$promise
    }
    return Token.save(params).$promise
  }

  function tokenErrorHandler (error) {
    getValidationCode()
    return $q.reject(error)
  }

  function persistToken (token) {
    LoginUser.setUser(_.pick(token, 'user', 'token'))

    if (token.wechat_token) {
      LocalStorage.set('wechat_token', token.wechat_token)
    } else {
      LocalStorage.remove('wechat_token')
    }

    if (token.message) {
      ConfirmModal.open(ErrorCode[token.message])
    }
  }

  function goToHomePage () {
    Cookie.remove(VALIDATION_CODE_TOKEN)
    if (LoginUser.checkRole(Roles.ROLE_ADMIN)) {
      $state.go('base.userManagement')
    } else {
      $state.go('static.projectList')
    }
  }
}
