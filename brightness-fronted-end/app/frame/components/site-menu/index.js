import template from 'raw!./site-menu.html'
import Menu from 'root/constant/menu.js'
import Roles from 'root/constant/roles'

import './site-menu.scss'

export default ($window, LoginUser, CurrentProject) => {
  'ngInject'

  return new SiteMenu($window, LoginUser, CurrentProject)
}

class SiteMenu {
  constructor ($window, LoginUser, CurrentProject) {
    this.template = template
    this.replace = true
    this.scope = {}
    this.LoginUser = LoginUser
    this.window = $window
    this.CurrentProject = CurrentProject
  }
  checkProjectStatus (status) {
    return this.CurrentProject.getCurrentProject() ? this.CurrentProject.checkProjectStatus(status) : false
  }
  checkRole (role) {
    return this.LoginUser.checkRole(role)
  }
  compile () {
    return (scope) => {
      scope.Menu = Menu

      scope.checkHomePermission = (item) => {
        return item.state && (item.roles ? this.checkRole(item.roles) : true) &&
          (item.projectStatus ? this.checkProjectStatus(item.projectStatus) : true)
      }
      scope.checkItemPermission = (item) => {
        return !item.state && (item.roles ? this.checkRole(item.roles) : true) &&
          (item.projectStatus ? this.checkProjectStatus(item.projectStatus) : true)
      }

      scope.checkSubmenuPermission = (item) => {
        return (item.roles ? this.checkRole(item.roles) : true) &&
          (item.projectStatus ? this.checkProjectStatus(item.projectStatus) : true) &&
          item.subMenu && item.subMenu.length
      }

      scope.checkSubItemPermission = (subitem) => {
        return (subitem.roles ? this.checkRole(subitem.roles) : true) &&
          (subitem.projectStatus ? this.checkProjectStatus(subitem.projectStatus) : true)
      }

      scope.$on('$stateChangeSuccess', function (event, toState) {
        this.window.scrollTo(0, 0)
        scope.currentState = toState.name
      }.bind(this))

      scope.isShowForProjectSelected = (item) => {
        const isProjectSelected = !!this.CurrentProject.getCurrentProject()
        const isLoginAdmin = !!this.LoginUser.isVaildIdentity(Roles.ROLE_ADMIN)
        return !!item.noneProjectSelected === !isProjectSelected && !!item.adminOnly === isLoginAdmin
      }
    }
  }
}
