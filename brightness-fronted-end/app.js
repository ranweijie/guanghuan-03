import 'babel-polyfill'
import './app.scss'
import './icon.font'

// libs
import angular from 'angular'
import ngLocale from 'angular-i18n/zh-cn'
import ngAnimate from 'angular-animate'
import ngResource from 'angular-resource'
import ngCookies from 'angular-cookies'
import uiRouter from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'
import Cookie from 'js-cookie'
import ngFileUpload from 'ng-file-upload'
// config
import config from 'config'
// components
import components from './components'
import {openInWeixin} from './constant/is'
// filter
import filters from './filter'
// app
import appUtil from './app/util'
import home from './app/home'
import progressTracking from './app/progress-tracking'
import schedule from './app/schedule'
import projectInfo from './app/project-info'
import patientInfo from './app/patient-info'
import operationSurvey from './app/operation-survey'
import launchCeremony from './app/launch-ceremony'
import progressUpdate from './app/progress-update'
import frame from './app/frame'
import login from './app/login'
import logout from './app/logout'
import resetPassword from './app/reset-password'
import staticPages from './app/static'
import userManagement from './app/user-management'
import participants from './app/participants'
import finance from './app/finance'
import projectHistory from './app/project-history'
import investigation from './app/investigation'
import hospital from './app/hospital'
import hotel from './app/hotel'
import trip from './app/trip'
import curedStatus from './app/cured-status'
import projectExperience from './app/project-experience'
import feedback from './app/feedback'
import sroi from './app/sroi'

if (openInWeixin && !Cookie.get('openid')) {
  if (!__DEBUG__) {
    location.href = config.weixinRedirectUrl
  }
}

const moduleName = 'HNA.GUANGMINGXING.app'

angular.module(moduleName, [
  uiRouter,
  ngLocale,
  ngAnimate,
  ngResource,
  ngCookies,
  uiBootstrap,
  ngFileUpload,
  components.name,
  filters.name,
  appUtil.name,
  login.name,
  logout.name,
  resetPassword.name,
  home.name,
  frame.name,
  progressTracking.name,
  schedule.name,
  projectInfo.name,
  patientInfo.name,
  operationSurvey.name,
  launchCeremony.name,
  progressUpdate.name,
  staticPages.name,
  userManagement.name,
  participants.name,
  finance.name,
  projectHistory.name,
  investigation.name,
  hospital.name,
  hotel.name,
  trip.name,
  curedStatus.name,
  projectExperience.name,
  feedback.name,
  sroi.name
])

angular.element(document).ready(function () {
  angular.bootstrap(document, [moduleName])
})
