import ProjectProgressController from './project-progress.controller'
import ProjectProgressTemplate from 'raw!./project-progress.html'

import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.progressUpdate', {
      url: 'progressUpdate',
      template: ProjectProgressTemplate,
      controller: ProjectProgressController,
      controllerAs: 'vm',
      resolve: {
        projectProgressData: ProjectProgressController.resolver
      },
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD],
        auth: true
      }
    })
}
