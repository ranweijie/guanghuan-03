import calendarTemplate from 'raw!./progress-date-board.html'
import './progress-date-board.scss'

export default () => {
  return {
    restrict: 'E',
    scope: {
      startDate: '@',
      endDate: '@'
    },
    template: calendarTemplate,
    controller: ($scope) => {
      'ngInject'

      const today = new Date(new Date().toDateString())
      const startDate = new Date($scope.startDate.replace(/-/g, '/'))
      const endDate = new Date($scope.endDate.replace(/-/g, '/'))

      $scope.currentDateNum = (!startDate || today > endDate || today < startDate) ? 0 : getDateDurationNum(startDate, today)

      function getDateDurationNum (startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000
        return Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / (oneDay))) + 1
      }
    }
  }
}
