import CuredStatusViewController from './cured-status-view.controller'
import CuredStatusViewTemplate from 'raw!./cured-status-view.html'

import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.curedStatus', {
      url: 'curedStatus',
      template: '<div ui-view></div>',
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
    .state('base.curedStatus.view', {
      parent: 'base.curedStatus',
      url: '/view',
      controller: CuredStatusViewController,
      controllerAs: 'vm',
      template: CuredStatusViewTemplate,
      resolve: {
        CuredNumbers: CuredStatusViewController.getCuredNumber,
        PatientList: CuredStatusViewController.getPatientList
      }
    })
}
