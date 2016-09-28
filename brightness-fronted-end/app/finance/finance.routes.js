import FinanceController from './finance.controller'
import FinanceTemplate from 'raw!./finance.html'
import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.finance', {
      url: 'finance',
      template: FinanceTemplate,
      controller: FinanceController,
      controllerAs: 'vm',
      resolve: {
        FinanceData: FinanceController.resolver
      },
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_FINANCIER],
        auth: true
      }
    })
}
