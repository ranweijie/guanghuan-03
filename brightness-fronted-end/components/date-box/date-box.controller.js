import './date-box.scss'

export default function ($filter, $scope) {
  'ngInject'

  var ctrl = this

  $scope.date = ctrl.date ? new Date(ctrl.date.replace(/-/g, '/')) : ''
}
