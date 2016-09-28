import PopupCalendarController from './popup-calendar.controller'
import PopupCalendarTemplate from 'raw!./popup-calendar.html'

export default () => {
  return {
    require: ['hnaPopupCalendar', '?^ngModel'],
    template: PopupCalendarTemplate,
    controller: PopupCalendarController,
    scope: {
      date: '=',
      isRequired: '='
    },
    link: function ($scope, element, attrs, ctrls) {
      let popupCalendarCtrl = ctrls[0]
      let ngModelCtrl = ctrls[1]
      if (ngModelCtrl) {
        popupCalendarCtrl.setNgModelController(ngModelCtrl)
      }
    }
  }
}
