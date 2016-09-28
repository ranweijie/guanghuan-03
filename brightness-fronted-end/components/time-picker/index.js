import TimePickerController from './time-picker.controller'
import TimePickerTemplate from 'raw!./time-picker.html'

export default () => {
  return {
    require: ['hnaTimePicker', '?^ngModel'],
    template: TimePickerTemplate,
    controller: TimePickerController,
    scope: {
      time: '='
    },
    link: function ($scope, element, attrs, ctrls) {
      let timePickerCtrl = ctrls[0]
      let ngModelCtrl = ctrls[1]
      if (ngModelCtrl) {
        timePickerCtrl.setNgModelController(ngModelCtrl)
      }
    }
  }
}
