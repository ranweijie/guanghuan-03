import calendarTemplate from 'raw!./calendar.html'
import './calendar.scss'

export default () => {
  return {
    restrict: 'E',
    scope: {
      initDate: '=',
      startDate: '=',
      endDate: '=',
      clickable: '=',
      selectedDate: '=',
      theme: '='
    },
    template: calendarTemplate,
    controller: ($scope) => {
      'ngInject'

      const today = new Date()

      $scope.date = $scope.initDate || today
      $scope.today = today
      $scope.options = {
        showWeeks: false,
        formatDayTitle: 'yyyy MMMM'
      }

      if ($scope.startDate && $scope.endDate) {
        const startDate = new Date($scope.startDate.replace(/-/g, '/'))
        const endDate = new Date($scope.endDate.replace(/-/g, '/'))

        $scope.currentDateNum = (today > endDate || today < startDate) ? 0 : getDateDurationNum(startDate, today)
        $scope.totalDateNum = getDateDurationNum(startDate, endDate)

        $scope.events = []
        for (let i = 0; i < $scope.totalDateNum; i++) {
          const scheduledDate = new Date(startDate)
          scheduledDate.setDate(startDate.getDate() + i)
          $scope.events.push({date: scheduledDate, status: 'selected'})
        }

        $scope.options.minDate = startDate
        $scope.options.maxDate = endDate
        $scope.options.customClass = getDayClass
      }

      $scope.datePickerSelected = function (date) {
        $scope.selectedDate = date
      }

      function getDayClass (data) {
        const date = data.date
        const mode = data.mode
        if (mode === 'day') {
          const dayToCheck = new Date(date).setHours(0, 0, 0, 0)
          for (var i = 0; i < $scope.events.length; i++) {
            const currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0)
            if (dayToCheck === currentDay) {
              return $scope.events[i].status
            }
          }
        }
        return ''
      }

      function getDateDurationNum (startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000
        return Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / (oneDay))) + 1
      }
    }
  }
}
