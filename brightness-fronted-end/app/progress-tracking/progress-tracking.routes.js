import ProgressTrackingController from './progress-tracking.controller'
import ProgressTrackingTemplate from 'raw!./progress-tracking-view.html'

import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.progressTracking', {
      url: 'progressTracking',
      controller: ProgressTrackingController,
      controllerAs: 'vm',
      template: ProgressTrackingTemplate,
      resolve: {
        Datas: ProgressTrackingController.resolver
      },
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_VOLUNTEER],
        auth: true
      }
    })
}
