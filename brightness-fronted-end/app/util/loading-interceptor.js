export default function ($q, $rootScope) {
  'ngInject'

  let totalActiveRequest = 0

  const start = () => {
    $rootScope.$broadcast('loading.begin')
  }
  const stop = () => {
    $rootScope.$broadcast('loading.end')
  }

  const startRequest = () => {
    ++totalActiveRequest
    if (totalActiveRequest === 1) {
      start()
    }
  }
  const endRequest = () => {
    --totalActiveRequest
    if (totalActiveRequest === 0) {
      stop()
    }
  }

  return {
    request (config) {
      startRequest()
      return $q.when(config)
    },
    response (resp) {
      endRequest()
      return $q.when(resp)
    },
    responseError (rejection) {
      endRequest()
      return $q.reject(rejection)
    }
  }
}
