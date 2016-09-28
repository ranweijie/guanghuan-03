import angular from 'angular'
import ErrorCode from 'root/constant/error-code'

export default function ($q, $injector) {
  'ngInject'

  return {
    responseError (rejection) {
      return $injector.invoke(($state, $log, ConfirmModal) => {
        'ngInject'

        // 由 auth-interceptor 处理 401, 403
        if (rejection.status === 401 || rejection.status === 403) {
          return $q.reject(rejection)
        }

        if (rejection.status === 406) {
          ConfirmModal.open(ErrorCode.current_project_status_changed)
          $state.go('static.projectList')
        }

        // others
        switch (rejection.status) {
          case 422:
            { // 非法字符
              const message = getMessage(rejection.data)
              if (message) {
                ConfirmModal.open(message)
              }
              break
            }
          case 500:
            {
              ConfirmModal.open('您所请求的页面暂时不可用！')
              break
            }
          default:
            {
              $log.info(`其他错误：${rejection.status} - ${rejection.data}`)
            }
        }

        return $q.reject(rejection)
      })
    }
  }
  // privates
  function getMessage (rejectionData) {
    if (angular.isObject(rejectionData)) {
      return ErrorCode[rejectionData.message]
    }
  }
}
