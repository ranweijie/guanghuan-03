import LaunchCeremonyViewController from './launch-ceremony-view.controller'
import LaunchCeremonyFormController from './launch-ceremony-form.controller'
import LaunchCeremonyViewTemplate from 'raw!./launch-ceremony-view.html'
import LaunchCeremonyFormTemplate from 'raw!./launch-ceremony-form.html'
import Roles from 'root/constant/roles'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.launchCeremonyView', {
      url: 'launchCeremony/view',
      controller: LaunchCeremonyViewController,
      controllerAs: 'vm',
      template: LaunchCeremonyViewTemplate,
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_VOLUNTEER],
        auth: true
      },
      resolve: {
        launchCeremonyData: LaunchCeremonyViewController.resolver
      }
    })
    .state('base.launchCeremonyForm', {
      url: 'launchCeremony/form',
      controller: LaunchCeremonyFormController,
      controllerAs: 'vm',
      template: LaunchCeremonyFormTemplate,
      data: {
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_VOLUNTEER],
        auth: true
      },
      resolve: {
        launchCeremonyData: LaunchCeremonyViewController.resolver
      }
    })
}
