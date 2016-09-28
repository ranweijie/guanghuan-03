import Cookie from 'js-cookie'
import {isNull, isEmpty, isString, isEqual, isArray, includes} from 'lodash'
const LOGIN_USER_KEY = 'LOGIN_USER'

export default class loginUserService {
  constructor ($state, $http, Wechat, SessionStorage, LocalStorage) {
    'ngInject'
    this.$state = $state
    this.$http = $http
    this.SessionStorage = SessionStorage
    this.LocalStorage = LocalStorage

    if (Wechat.openInWeixin) {
      const token = Cookie.get('token')
      if (token) {
        this.setUser({token})
      }
    }

    this.getUser()
  }

  setUser (user) {
    this.SessionStorage.set(LOGIN_USER_KEY, user)
    this.loginUser = user
  }

  getUser () {
    if (!this.loginUser) {
      this.loginUser = this.SessionStorage.get(LOGIN_USER_KEY)
    }
    return this.loginUser
  }

  getToken () {
    const user = this.getUser()
    return user ? user.token : null
  }

  logout () {
    const token = this.getToken()
    this.$http.delete('/api/token/' + token).then((res) => {})
    this.clear()
    this.$state.go('login')
  }

  checkRole (role) {
    const user = this.getUser()
    const userRole = user.user.roleCode

    if (isNull(role) || isEmpty(role)) {
      return true
    }

    if (isString(role)) {
      return isEqual(role, userRole)
    } else if (isArray(role)) {
      return includes(role, userRole)
    }
  }

  isVaildIdentity (role) {
    const user = this.getUser()
    const userRole = user.user.roleCode

    if (isNull(role) || isEmpty(role)) {
      return true
    }
    if (isString(role)) {
      return isEqual(role, userRole)
    } else if (isArray(role)) {
      return includes(role, userRole)
    }
  }

  clear () {
    this.SessionStorage.remove(LOGIN_USER_KEY)
    this.LocalStorage.remove('wechat_token')
    this.loginUser = null
  }

}
