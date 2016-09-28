import scheduleController from './schedule.controller'
import scheduleListView from 'raw!./templates/schedule-list-view.html'
import scheduleDetailView from 'raw!./templates/schedule-detail-view.html'
import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.updateSchedule', {
      abstract: true,
      url: 'schedule',
      template: '<div ui-view></div>',
      resolve: {
        Participant: scheduleController.resolver
      },
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD],
        auth: true
      }
    })
    .state('base.updateSchedule.list', {
      url: '/updateList',
      parent: 'base.updateSchedule',
      params: {readOnly: false},
      controller: scheduleController,
      controllerAs: 'vm',
      template: scheduleListView,
      data: {
        readOnly: false
      }
    })
    .state('base.updateSchedule.detail', {
      url: '/updateDetail',
      parent: 'base.updateSchedule',
      params: {selectedDate: null, readOnly: false, fromState: null},
      controller: scheduleController,
      controllerAs: 'vm',
      template: scheduleDetailView
    })

    .state('base.reviewSchedule', {
      abstract: true,
      url: 'schedule',
      template: '<div ui-view></div>',
      resolve: {
        Participant: scheduleController.resolver
      },
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_VOLUNTEER],
        auth: true
      }
    })
    .state('base.reviewSchedule.list', {
      url: '/reviewList',
      parent: 'base.reviewSchedule',
      params: {readOnly: true},
      controller: scheduleController,
      controllerAs: 'vm',
      template: scheduleListView,
      data: {
        readOnly: true
      }
    })
    .state('base.reviewSchedule.detail', {
      url: '/reviewDetail',
      parent: 'base.reviewSchedule',
      params: {selectedDate: null, readOnly: false, fromState: null},
      controller: scheduleController,
      controllerAs: 'vm',
      template: scheduleDetailView
    })
}
