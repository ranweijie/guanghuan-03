
import logoutController from './logout.controller'

export default ($stateProvider) => {
  'ngInject'
  $stateProvider
      .state('base.logout', {
        url: 'logout',
        controller: logoutController,
        controllerAs: 'vm',
        data: {
          auth: true
        }
      })
}
