import Roles from 'root/constant/roles'

import HotelListController from './hotel-list.controller'
import HotelViewController from './hotel-view.controller'
import HotelFormController from './hotel-form.controller'
import HotelListTemplate from 'raw!./hotel-list.html'
import HotelViewTemplate from 'raw!./hotel-view.html'
import HotelFormTemplate from 'raw!./hotel-form.html'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.hotel', {
      url: 'hotel',
      template: '<div ui-view></div>',
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
    .state('base.hotel.list', {
      parent: 'base.hotel',
      url: '/list',
      controller: HotelListController,
      controllerAs: 'vm',
      template: HotelListTemplate,
      resolve: {
        HotelList: HotelListController.resolver
      }
    })
    .state('base.hotel.view', {
      parent: 'base.hotel',
      url: '/view/:id',
      controller: HotelViewController,
      controllerAs: 'vm',
      template: HotelViewTemplate,
      resolve: {
        HotelInfo: HotelViewController.resolver
      }
    })
    .state('base.hotel.form', {
      parent: 'base.hotel',
      url: '/form/:id',
      controller: HotelFormController,
      controllerAs: 'vm',
      template: HotelFormTemplate,
      resolve: {
        HotelInfo: HotelFormController.resolver
      }
    })
}
