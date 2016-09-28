import template from 'raw!./request-loading.html'
import './request-loading.scss'

export default (LoginUser) => {
  'ngInject'
  return new RequestLoading(LoginUser)
}

class RequestLoading {
  constructor (LoginUser) {
    this.template = template
    this.replace = true
    this.scope = {}
    this.LoginUser = LoginUser
  }

  compile () {
    return (scope, element, attr) => {
      scope.$on('loading.begin', function () {
        scope.loading = true
      })
      scope.$on('loading.end', function () {
        scope.loading = false
      })
    }
  }
}
