import Roles from 'root/constant/roles'

import HospitalListController from './hospital-list.controller'
import HospitalViewController from './hospital-view.controller'
import HospitalListTemplate from 'raw!./hospital-list.html'
import HospitalViewTemplate from 'raw!./hospital-view.html'

import HospitalFormController from './hospital-form.controller'
import HospitalFormTemplate from 'raw!./hospital-form.html'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.hospital', {
      url: 'hospital',
      template: '<div ui-view></div>',
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
    .state('base.hospital.list', {
      parent: 'base.hospital',
      url: '/list',
      controller: HospitalListController,
      controllerAs: 'vm',
      template: HospitalListTemplate,
      resolve: {
        HospitalList: HospitalListController.resolver
      }
    })
    .state('base.hospital.view', {
      parent: 'base.hospital',
      url: '/view/:id',
      controller: HospitalViewController,
      controllerAs: 'vm',
      template: HospitalViewTemplate,
      resolve: {
        HospitalInfo: HospitalViewController.resolver
      }
    })
    .state('base.hospital.form', {
      parent: 'base.hospital',
      url: '/form/:id',
      controller: HospitalFormController,
      controllerAs: 'vm',
      template: HospitalFormTemplate,
      resolve: {
        HospitalInfo: HospitalFormController.resolver
      }
    })
}
