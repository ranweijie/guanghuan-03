import InvestigationViewController from './investigation-view.controller'
import InvestigationFormController from './investigation-form.controller'
import InvestigationViewTemplate from 'raw!./investigation-view.html'
import InvestigationFormTemplate from 'raw!./investigation-form.html'

import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.investigation', {
      url: 'investigation',
      template: '<div ui-view></div>',
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
    .state('base.investigation.view', {
      parent: 'base.investigation',
      url: '/view',
      controller: InvestigationViewController,
      controllerAs: 'vm',
      template: InvestigationViewTemplate,
      resolve: {
        InvestigationData: InvestigationViewController.resolver
      }
    })
    .state('base.investigation.form', {
      parent: 'base.investigation',
      url: '/form',
      controller: InvestigationFormController,
      controllerAs: 'vm',
      template: InvestigationFormTemplate,
      resolve: {
        InvestigationData: InvestigationViewController.resolver
      }
    })
}
