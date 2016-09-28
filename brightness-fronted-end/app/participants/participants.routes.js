import ParticipantsController from './participants.controller'
import ParticipantsTemplate from 'raw!./participants-list.html'
import ParticipantsFormController from './participants-form.controller'
import participantsFormTemplate from 'raw!./participants-form.html'
import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.participants', {
      url: 'participants',
      template: '<div ui-view></div>',
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
        auth: true
      }
    })
    .state('base.participants.list', {
      parent: 'base.participants',
      url: '/list',
      controller: ParticipantsController,
      controllerAs: 'vm',
      template: ParticipantsTemplate,
      resolve: {
        participantList: ParticipantsController.resolver
      }
    })
    .state('base.participants.form', {
      parent: 'base.participants',
      url: '/form',
      controller: ParticipantsFormController,
      controllerAs: 'vm',
      template: participantsFormTemplate,
      params: {
        participant: {}
      }
    })
}
