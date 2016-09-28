import Roles from 'root/constant/roles'

import TripListController from './trip-list.controller'
import TripFormController from './trip-form.controller'
import TripListTemplate from 'raw!./trip-list.html'
import TripFormTemplate from 'raw!./trip-form.html'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.trip', {
      url: 'trip',
      template: '<div ui-view></div>',
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
    .state('base.trip.list', {
      parent: 'base.trip',
      url: '/list',
      controller: TripListController,
      controllerAs: 'vm',
      template: TripListTemplate,
      resolve: {
        TripList: TripListController.resolver
      }
    })
    .state('base.trip.form', {
      parent: 'base.trip',
      url: '/form/:id',
      controller: TripFormController,
      controllerAs: 'vm',
      template: TripFormTemplate,
      resolve: {
        TripInfo: TripFormController.resolver
      }
    })
}
