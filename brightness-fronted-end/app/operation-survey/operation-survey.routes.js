import OperationSurveyFormController from './operation-survey-form.controller'
import OperationSurveyViewController from './operation-survey-view.controller'
import operationSurveyView from 'raw!./operation-survey.html'
import operationSurveyForm from 'raw!./operation-survey-form.html'
import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'
  $stateProvider
    .state('base.operationSurvey', {
      abstract: true,
      url: 'operationSurvey',
      template: '<div ui-view></div>',
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
    .state('base.operationSurvey.view', {
      url: '/view',
      parent: 'base.operationSurvey',
      controller: OperationSurveyViewController,
      controllerAs: 'vm',
      template: operationSurveyView,
      resolve: {
        OperationSurvey: OperationSurveyViewController.getOperationSurveyToView
      }
    })
    .state('base.operationSurvey.form', {
      url: '/form',
      parent: 'base.operationSurvey',
      controller: OperationSurveyFormController,
      controllerAs: 'vm',
      template: operationSurveyForm,
      resolve: {
        OperationSurvey: OperationSurveyFormController.getOperationSurveyToForm
      }
    })
}
