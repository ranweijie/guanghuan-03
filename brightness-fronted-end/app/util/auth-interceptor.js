import ErrorCode from 'root/constant/error-code'

export default function ($q, $injector) {
  'ngInject'

  return {
    request (config) {
      return $injector.invoke((LoginUser) => {
        'ngInject'

        const token = LoginUser.getToken()
        if (token) {
          config.headers.Authorization = `Token ${token}`
        }

        return $q.when(config)
      })
    },

    responseError (rejection) {
      return $injector.invoke(($state, ConfirmModal, LoginUser) => {
        'ngInject'

        // 登录信息错误 或 会话超时
        if (rejection.status === 401) {
          if (rejection.data.message !== 'other') {
            const message = ErrorCode[rejection.data.message] || ErrorCode.session_expired
            ConfirmModal.open(message)
          }

          LoginUser.clear()
          $state.go('login')
        }

        // 角色变更(权限不足), 修改密码(老密码错误)
        if (rejection.status === 403) {
          const message = ErrorCode[rejection.data.message] || ErrorCode.operation_forbidden
          ConfirmModal.open(message)
        }

        return $q.reject(rejection)
      })
    }
  }
}
