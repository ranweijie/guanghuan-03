import userManagementController from './user-management.controller'
import userManagementView from 'raw!./user-management.html'

import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.userManagement', {
      url: 'userManagement',
      controller: userManagementController,
      controllerAs: 'vm',
      template: userManagementView,
      resolve: {
        resolvedData: userManagementController.resolver
      },
      data: {
        roles: [Roles.ROLE_ADMIN],
        auth: true
      }
    })
}
