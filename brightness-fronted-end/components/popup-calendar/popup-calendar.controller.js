import './popup-calendar.scss'

import { isEmpty } from 'lodash'
import moment from 'moment'

export default function ($scope) {
  'ngInject'

  let ctrl = this
  let ngModelController = null

  ctrl.setNgModelController = (newNgModelController) => {
    ngModelController = newNgModelController
    if ($scope.isRequired && isEmpty($scope.date)) {
      $scope.requiredDate = true
      ngModelController.$setValidity('required', false)
    } else {
      $scope.requiredDate = false
    }
  }

  $scope.viewDate = $scope.date ? new Date(moment($scope.date, 'YYYY-MM-DD')) : ''
  $scope.invalidDate = false

  $scope.dateOptions = {
    startingDay: 1,
    minDate: new Date('2000/01/01'),
    maxDate: new Date('3000/12/31')
  }

  $scope.ngModelOptions = {
    updateOn: 'default blur',
    debounce: { 'default': 500, 'blur': 0 },
    allowInvalid: true
  }

  $scope.open = () => {
    $scope.popup.opened = true
  }

  $scope.altInputFormats = ['yyyy-M!-d!']

  $scope.popup = {
    opened: false
  }

  $scope.datePickerSelected = () => {
    let date = $scope.viewDate
    if (dateValidate(date)) {
      $scope.date = (date instanceof Date) ? moment(date).format('YYYY-MM-DD') : ''
      $scope.invalidDate = false
      ngModelController.$setValidity('date', true)
    } else {
      $scope.invalidDate = true
      ngModelController.$setValidity('date', false)
    }
  }

  const dateValidate = (date) => {
    if (!date) {
      if ($scope.isRequired) {
        $scope.requiredDate = true
        ngModelController.$setValidity('required', false)
      }
      return true
    }

    if ($scope.isRequired) {
      $scope.requiredDate = false
      ngModelController.$setValidity('required', true)
    }

    if (date instanceof Date) {
      date = moment(date).format('YYYY-MM-DD')
    } else {
      return false
    }

    let parts = date.split('-')
    let year = parseInt(parts[0], 10)
    let month = parseInt(parts[1], 10)
    let day = parseInt(parts[2], 10)

    if (year < 2000 || year > 3000 || month === 0 || month > 12) {
      return false
    }

    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29
    }

    return day > 0 && day <= monthLength[month - 1]
  }
}
