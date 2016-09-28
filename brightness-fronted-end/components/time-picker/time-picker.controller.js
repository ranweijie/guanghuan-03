import './time-picker.scss'

import { isEmpty } from 'lodash'
import moment from 'moment'

export default function ($scope, $document) {
  'ngInject'

  let ctrl = this
  let ngModelController = null

  ctrl.setNgModelController = (newNgModelController) => (ngModelController = newNgModelController)

  $scope.invalidTime = false

  $scope.ngModelOptions = {
    updateOn: 'default blur',
    debounce: { 'default': 500, 'blur': 0 }
  }

  $scope.$watch('time', (time) => {
    $scope.viewTime = {
      hour: isEmpty(time) ? 'HH' : moment(time.split(':')[0], 'hh').format('HH'),
      minute: isEmpty(time) ? 'MM' : moment(time.split(':')[1], 'mm').format('mm')
    }
  })

  $scope.timeOptions = {
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  }

  $scope.appendToEl = angular.element($document[0].querySelector('#dropdown-long-content'))

  $scope.updateHour = (hour = 'HH') => {
    $scope.viewTime.hour = hour === 'HH' ? '' : moment(hour, 'hh').format('HH')
    timeValidate()
  }

  $scope.updateMinute = (minute = 'MM') => {
    $scope.viewTime.minute = minute === 'MM' ? '' : moment(minute, 'mm').format('mm')
    timeValidate()
  }

  const timeValidate = () => {
    let selectedHour = $scope.viewTime.hour === 'HH' ? '' : $scope.viewTime.hour
    let selectedMinute = $scope.viewTime.minute === 'MM' ? '' : $scope.viewTime.minute
    if (isEmpty(selectedHour) && isEmpty(selectedMinute)) {
      $scope.invalidTime = false
      ngModelController.$setValidity('time', true)
      $scope.time = ''
    } else if (!isEmpty(selectedHour) && !isEmpty(selectedMinute)) {
      $scope.invalidTime = false
      ngModelController.$setValidity('time', true)
      $scope.time = moment(`${selectedHour}:${selectedMinute}`, 'hh:mm').format('HH:mm')
    } else {
      $scope.invalidTime = true
      ngModelController.$setValidity('time', false)
    }
  }
}
