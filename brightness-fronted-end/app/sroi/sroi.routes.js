import Roles from 'root/constant/roles'

import SroiController from './sroi.controller'
import SroiTemplate from 'raw!./sroi.html'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.sroi', {
      url: 'sroi',
      controller: SroiController,
      controllerAs: 'vm',
      template: SroiTemplate,
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
}
