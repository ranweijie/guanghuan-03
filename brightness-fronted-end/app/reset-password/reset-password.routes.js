import resetPasswordController from './reset-password.controller'
import resetPasswordView from 'raw!./reset-password.html'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
    .state('base.resetPassword', {
      url: 'resetPassword',
      controller: resetPasswordController,
      controllerAs: 'vm',
      template: resetPasswordView,
      data: {
        auth: true
      }
    })
}
