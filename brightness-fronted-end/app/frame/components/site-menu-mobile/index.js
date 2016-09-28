import angular from 'angular'
import template from 'raw!./site-menu-mobile.html'
import Menu from 'root/constant/menu.js'
import './site-menu-mobile.scss'

export default (LoginUser, $sce) => {
  'ngInject'
  return new SiteMenuMobile(LoginUser, $sce)
}

class SiteMenuMobile {
  constructor (LoginUser, $sce) {
    this.template = template
    this.replace = true
    this.scope = {}
    this.LoginUser = LoginUser
    this.sce = $sce
  }

  compile () {
    return (scope) => {
      scope.toggleViewInfo = function () {
        scope.collectInfoPopoverIsOpen = false
        scope.accountPopoverIsOpen = false
        scope.viewInfoPopoverIsOpen = !scope.viewInfoPopoverIsOpen
      }

      scope.toggleCollectInfo = function () {
        scope.accountPopoverIsOpen = false
        scope.viewInfoPopoverIsOpen = false
        scope.collectInfoPopoverIsOpen = !scope.collectInfoPopoverIsOpen
      }

      scope.toggleAccountInfo = function () {
        scope.collectInfoPopoverIsOpen = false
        scope.viewInfoPopoverIsOpen = false
        scope.accountPopoverIsOpen = !scope.accountPopoverIsOpen
      }

      var viewInfoMenuHtmlString = ''
      Menu[1].subMenu.forEach(function (item) {
        if (item && this.LoginUser.checkRole(item.roles)) {
          if (item.state === 'base.reviewSchedule.list') {
            viewInfoMenuHtmlString += '<a id="mobile_' + item.state.substring(5, item.state.length) + '" href="#/schedule/reviewList">' + item.name + '</a>'
          } else {
            viewInfoMenuHtmlString += '<a id="mobile_' + item.state.substring(5, item.state.length) + '" href="' + item.state.replace('base', '#').split('.').join('/') + '">' + item.name + '</a>'
          }
        }
      }.bind(this))

      var collectInfoMenuHtmlString = ''
      Menu[2].subMenu.forEach(function (item) {
        if (item && this.LoginUser.checkRole(item.roles)) {
          if (item.state === 'base.updateSchedule.list') {
            collectInfoMenuHtmlString += '<a id="mobile_' + item.state.substring(5, item.state.length) + '" href="#/schedule/updateList">' + item.name + '</a>'
          } else {
            collectInfoMenuHtmlString += '<a id="mobile_' + item.state.substring(5, item.state.length) + '" href="' + item.state.replace('base', '#').split('.').join('/') + '">' + item.name + '</a>'
          }
        }
      }.bind(this))

      var accountMenuHtmlString = ''
      Menu[3].subMenu.forEach(function (item) {
        if (item && this.LoginUser.checkRole(item.roles)) {
          accountMenuHtmlString += '<a id="mobile_' + item.state.substring(5, item.state.length) + '" href="' + item.state.replace('base', '#').split('.').join('/') + '">' + item.name + '</a>'
        }
      }.bind(this))
      accountMenuHtmlString += '<a id="mobile_logout" href="#/logout">退出账户</a>'

      scope.collectInfoMenu = this.sce.trustAsHtml(collectInfoMenuHtmlString)
      scope.viewInfoMenu = this.sce.trustAsHtml(viewInfoMenuHtmlString)
      scope.accountMenu = this.sce.trustAsHtml(accountMenuHtmlString)

      scope.$on('$stateChangeSuccess', function () {
        scope.viewInfoPopoverIsOpen = false
        scope.collectInfoPopoverIsOpen = false
        scope.accountPopoverIsOpen = false
        angular.element('.popover').remove()
      })

      scope.homeIcon = require('root/images/home.png')
      scope.infoCollectIcon = require('root/images/info-collect.png')
      scope.infoCollectActiveIcon = require('root/images/info-collect-active.png')
      scope.infoViewIcon = require('root/images/info-view.png')
      scope.infoViewActiveIcon = require('root/images/info-view-active.png')
      scope.accountIcon = require('root/images/account.png')
      scope.accountActiveIcon = require('root/images/account-active.png')
    }
  }
}
