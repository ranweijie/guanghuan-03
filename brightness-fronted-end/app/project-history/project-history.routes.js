import ProjectHistoryController from './project-history.controller.js'
import RecordTemplate from 'raw!./project-history.html'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.projectHistory', {
      url: 'project-history',
      controller: ProjectHistoryController,
      controllerAs: 'vm',
      template: RecordTemplate,
      resolve: {
        ProjectList: ProjectHistoryController.resolver
      },
      data: {
        auth: true
      }
    })
}
