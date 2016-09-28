import FrameController from './frame.controller'
import FrameTemplate from 'raw!./frame.html'
import FrameStaticTemplate from 'raw!./frame-static.html'

export default ($stateProvider, $urlRouterProvider) => {
  'ngInject'

  $stateProvider
    .state('base', {
      url: '/',
      controller: FrameController,
      template: FrameTemplate,
      controllerAs: 'vm'
    })
    .state('static', {
      url: '/static/',
      controller: FrameController,
      template: FrameStaticTemplate,
      controllerAs: 'vm'
    })

  $urlRouterProvider.otherwise('/home')
}
