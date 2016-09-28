import './project-list.scss'
import {includes} from 'lodash'

function ProjectListController ($state, ProjectList, CurrentProject, ProjectStatus, LoginUser, Roles) {
  'ngInject'

  CurrentProject.clear()

  let vm = this

  vm.projectList = ProjectList._items.map((project) => {
    switch (project.status) {
      case ProjectStatus.PREPARING:
        project.statusImg = require('./images/preparing.png')
        break
      case ProjectStatus.IN_PROGRESS:
        project.statusImg = require('./images/in-progress.png')
        break
      case ProjectStatus.ARCHIVE:
        project.statusImg = require('./images/archive.png')
        break
    }
    return project
  }).filter((project) => {
    return !includes([ProjectStatus.END, ProjectStatus.CANCEL], project.status)
  })

  vm.background = require('root/images/bg.jpg')
  vm.arrow = require('./images/arrow.png')

  vm.selectProject = function (project) {
    CurrentProject.setCurrentProject(project)
    $state.go('base.home')
  }

  vm.createProject = function () {
    $state.go('static.createProject')
  }

  vm.isShowCreateBtn = function () {
    return includes([Roles.ROLE_CSR_LEAD], LoginUser.getUser().user.roleCode)
  }

  vm.isShowInfoContainer = function () {
    return !includes([Roles.ROLE_FINANCIER, Roles.ROLE_VOLUNTEER], LoginUser.getUser().user.roleCode)
  }
}

ProjectListController.getProjectList = function ($q, FormData) {
  'ngInject'

  return FormData.BASIC_PROJECT.get().$promise
}

export default ProjectListController
