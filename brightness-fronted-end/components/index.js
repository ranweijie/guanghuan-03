import angular from 'angular'

import geoMap from './geo-map'
import geoInfoMap from './geo-info-map'
import calendar from './calendar'
import popupCalendar from './popup-calendar'
import bindHtmlUnsafe from './bind-html-unsafe'
import requestLoading from './request-loading'
import ConfirmModal from './confirm-modal'
import progressDateBoard from './progress-date-board'
import uniqueUsername from './unique-username'
import barChart from './bar-chart'
import dateBox from './date-box'
import timePicker from './time-picker'

export default angular
  .module('HNA.GUANGMINGXING.components', [])
  .factory('ConfirmModal', ConfirmModal)
  .directive('bindHtmlUnsafe', bindHtmlUnsafe)
  .directive('requestLoading', requestLoading)
  .directive('hnaGeoMap', geoMap)
  .directive('hnaCalendar', calendar)
  .directive('hnaUniqueUsername', uniqueUsername)
  .directive('hnaProgressDateBoard', progressDateBoard)
  .directive('hnaPopupCalendar', popupCalendar)
  .directive('hnaTimePicker', timePicker)
  .component('hnaBarChart', barChart)
  .component('hnaDateBox', dateBox)
  .component('hnaGeoInfoMap', geoInfoMap)
