import angular from 'angular'

import static2016View from 'raw!./templates/2016.html'
import overTheYearsView from 'raw!./templates/over-the-years.html'
import staticController from './controllers/static-controller'

import './static.scss'

export default angular
  .module(__filename, [])
  .config(($stateProvider) => {
    'ngInject'
    $stateProvider
      .state('static.2016', {
        url: '2016',
        controller: staticController,
        controllerAs: 'vm',
        template: static2016View
      })
      .state('static.otherYears', {
        url: 'over-the-years',
        controller: staticController,
        controllerAs: 'vm',
        template: overTheYearsView
      })
  })
