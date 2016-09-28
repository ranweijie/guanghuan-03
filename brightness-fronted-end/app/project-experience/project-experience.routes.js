import ProjectExperienceController from './project-experience.controller'
import ProjectExperienceTemplate from 'raw!./project-experience.html'

import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.projectExperience', {
      url: 'projectExperience',
      controller: ProjectExperienceController,
      controllerAs: 'vm',
      template: ProjectExperienceTemplate,
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      },
      resolve: {
        ProjectExperience: ProjectExperienceController.resolver
      }
    })
}
