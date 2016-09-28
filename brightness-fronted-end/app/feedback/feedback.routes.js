import Roles from 'root/constant/roles'

import FeedbackViewController from './feedback-view.controller'
import FeedbackViewTemplate from 'raw!./feedback-view.html'
import FeedbackFormController from './feedback-form.controller'
import FeedbackFormTemplate from 'raw!./feedback-form.html'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.feedback', {
      url: 'feedback',
      template: '<div ui-view></div>',
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
    .state('base.feedback.view', {
      parent: 'base.feedback',
      url: '/view',
      controller: FeedbackViewController,
      controllerAs: 'vm',
      template: FeedbackViewTemplate,
      resolve: {
        FeedbackList: FeedbackViewController.resolver
      }
    })
    .state('base.feedback.form', {
      parent: 'base.feedback',
      url: '/form',
      controller: FeedbackFormController,
      controllerAs: 'vm',
      template: FeedbackFormTemplate
    })
}
