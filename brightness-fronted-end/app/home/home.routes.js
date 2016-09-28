import HomeController from './home.controller'
import HomeTemplate from 'raw!./home.html'
import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.home', {
      url: 'home',
      controller: HomeController,
      controllerAs: 'vm',
      template: HomeTemplate,
      data: {
        auth: true,
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_FINANCIER, Roles.ROLE_VOLUNTEER]
      }
    })
}
