import './home.scss'
import {includes} from 'lodash'

export default function ($scope, $window, $state, CurrentProject, ConfirmModal, FormData, LoginUser, Roles, ProjectStatus) {
  'ngInject'

  let vm = this

  vm.project = CurrentProject.getCurrentProject()

  vm.projectStatusConst = ProjectStatus

  vm.tipMsg = ''
  constructTipMessage()

  vm.isShowActions = LoginUser.isVaildIdentity(Roles.ROLE_CSR_LEAD)

  function constructTipMessage () {
    switch (vm.project.status) {
      case ProjectStatus.PREPARING:
        vm.tipMsg = '提示: 开始实施"' + vm.project.info.name + '"项目，请确认准备工作完成后开始执行项目'
        break
      case ProjectStatus.IN_PROGRESS:
        vm.tipMsg = '提示: 开始归档"' + vm.project.info.name + '"项目，请确认执行工作完成后开始归档项目'
        break
      case ProjectStatus.ARCHIVE:
        vm.tipMsg = '提示结束后信息将不可修改，请确认归档完成，再结束项目'
        break
    }
  }

  vm.updateStatus = function (status) {
    vm.updateToStatus = status
    let confirmMessage = ''
    switch (vm.updateToStatus) {
      case ProjectStatus.CANCEL:
        confirmMessage = '您将直接结束"' + vm.project.info.name + '"，此操作不可撤销!\r\n实地考察记录会被保存，准备阶段其余记录将被抛弃!'
        break
      case ProjectStatus.END:
        confirmMessage = '您将结束"' + vm.project.info.name + '"，此操作不可撤销!\r\n请确保所有数据已记录完毕。\r\n结束后的项目在首页"历年光明行"页面可以查阅。'
        break
      case ProjectStatus.IN_PROGRESS:
        confirmMessage = '您将开始执行"' + vm.project.info.name + '"，此操作不可撤销!'
        break
      case ProjectStatus.ARCHIVE:
        confirmMessage = '您将开始归档"' + vm.project.info.name + '"，此操作不可撤销!\r\n请确保执行阶段所有数据已记录完毕。'
        break
    }
    const options = {
      size: 'md',
      mode: 'confirm'
    }
    ConfirmModal.open(confirmMessage, options).then(updateProjectStatus)
  }

  function updateProjectStatus () {
    return FormData.PROJECT.patch({project_status: vm.project.status, project_id: vm.project._id}, {status: vm.updateToStatus}).$promise.then(() => {
      vm.project.status = vm.updateToStatus
      CurrentProject.setCurrentProject(vm.project)
      updateState()
      ConfirmModal.open('项目状态改变成功!').finally(updateState)
    })
  }

  function updateState () {
    if (includes([ProjectStatus.END, ProjectStatus.CANCEL], vm.updateToStatus)) {
      $state.go('static.projectList')
    }
  }
}
