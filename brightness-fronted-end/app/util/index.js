import {LocalStorage, SessionStorage} from './storage'
import LoginUser from './login-user'
import CurrentProject from './current-project'
import AuthInterceptor from './auth-interceptor'
import ErrorInterceptor from './error-interceptor'
import LoadingInterceptor from './loading-interceptor'
import InterceptorConfig from './interceptor-config'
import Wechat from './wechat'

export default angular
  .module('HNA.GUANGMINGXING.components.utils', [])

  .factory('AuthInterceptor', AuthInterceptor)
  .factory('ErrorInterceptor', ErrorInterceptor)
  .factory('LoadingInterceptor', LoadingInterceptor)
  .config(InterceptorConfig)

  .service('LocalStorage', LocalStorage)
  .service('SessionStorage', SessionStorage)

  .service('LoginUser', LoginUser)
  .service('CurrentProject', CurrentProject)

  .service('Wechat', Wechat)
