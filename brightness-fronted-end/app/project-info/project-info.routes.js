import ProjectInfoController from './project-info.controller'
import ProjectInfoFormController from './project-info-form.controller'
import ProjectListController from './project-list.controller'
import ProjectCreateController from './project-create.controller'
import ProjectInfoFormTemplate from 'raw!./project-info-form.html'
import ProjectInfoViewTemplate from 'raw!./project-info.html'
import ProjectListTemplate from 'raw!./project-list.html'
import ProjectCreateTemplate from 'raw!./project-create.html'
import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.projectInfo', {
      abstract: true,
      url: 'projectInfo',
      template: '<div ui-view></div>',
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
    .state('base.projectInfo.form', {
      url: '/form',
      controller: ProjectInfoFormController,
      controllerAs: 'vm',
      template: ProjectInfoFormTemplate,
      resolve: {
        ProjectInfo: ProjectInfoController.getProjectInfo
      }
    })
    .state('base.projectInfo.view', {
      url: '/view',
      controller: ProjectInfoController,
      controllerAs: 'vm',
      template: ProjectInfoViewTemplate,
      resolve: {
        ProjectInfo: ProjectInfoController.getProjectInfo
      }
    })
    .state('static.projectList', {
      url: 'project-list',
      controller: ProjectListController,
      controllerAs: 'vm',
      template: ProjectListTemplate,
      resolve: {
        ProjectList: ProjectListController.getProjectList
      }
    })
    .state('static.createProject', {
      url: 'create-project',
      controller: ProjectCreateController,
      controllerAs: 'vm',
      template: ProjectCreateTemplate
    })
}
