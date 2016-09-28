export default ($rootScope, $state, LoginUser) => {
  'ngInject'

  let callback = $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    // 没有登录, 进入登录页面
    if (toState.data && toState.data.auth && !LoginUser.getUser()) {
      event.preventDefault()
      $state.go('login')
      return
    }

    // 进入没有权限的页面, 停留在当前页 或 首页
    if (toState.data && toState.data.roles && !LoginUser.checkRole(toState.data.roles)) {
      event.preventDefault()
      $state.go(fromParams.name || 'base.home', {}, {replace: true})
      return
    }

    // 已登录用户进入登录页面, 自动进入首页面
    if (toState.data && toState.data.unlogin && LoginUser.getUser()) {
      event.preventDefault()
      $state.go(fromParams.name || 'base.home', {}, {replace: true})
      return
    }

    // $rootScope.$state = $state// todo:??
  })

  $rootScope.$on('$destroy', callback)
}
