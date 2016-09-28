import './user-management.scss'
import {omit} from 'lodash'

function userManagementController ($element, $scope, $window, ConfirmModal, User, resolvedData) {
  'ngInject'

  let vm = this

  vm.userInfoList = resolvedData.userInfoList
  vm.roleList = resolvedData.roleList
  vm.currentPage = 1
  vm.pageSize = 10

  vm.submitForm = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    submitUserInfo()
  }

  vm.updateUser = (user) => {
    vm.resetUserInfo()
    vm.userInfo = Object.assign({}, omit(user, 'selected'))
    vm.isUpdate = true
  }

  vm.deleteUser = (user) => {
    vm.currentUser = user
    const options = {
      size: 'sm',
      mode: 'confirm'
    }
    ConfirmModal.open('确认删除用户?', options).then(deleteUser)
  }

  vm.deleteSelectUser = () => {
    handleSelectedUser('确认删除选中用户?', batchDeleteUser)
  }

  vm.ResetSelectUser = () => {
    handleSelectedUser('确认重置选中用户的密码?', resetSelectedUserPassword)
  }

  vm.ExportSelectUser = () => {
    handleSelectedUser('确认导出用户信息?', exportSelectUser)
  }

  vm.requiredField = (field, form) => {
    return field.$error.required && (field.$dirty || form.$submitted)
  }

  vm.invalidLength = (field, form) => {
    return (field.$error.minlength || field.$error.maxlength) && (field.$dirty || form.$submitted)
  }

  // privates
  function submitUserInfo () {
    User.resource().save({id: vm.userInfo.userId}, vm.userInfo).$promise.then((data) => {
      if (vm.userInfo.userId) {
        vm.userInfoList = vm.userInfoList.map((userInfo) => {
          if (userInfo.userId === data.userId) {
            userInfo = data
          }
          return userInfo
        })
      } else {
        vm.userInfoList.push(data)
      }
    }).then(saveSuccess)
  }

  function deleteUser () {
    User.resource().delete({id: vm.currentUser.userId}).$promise.then(() => {
      vm.userInfoList = removeUserFromList(vm.currentUser.userId)
    }).then(() => { handleSuccess('删除成功') })
  }

  function batchDeleteUser () {
    User.batchDelete(vm.selectedUserIds).then(() => {
      vm.selectedUserIds.forEach((userId) => {
        vm.userInfoList = removeUserFromList(userId)
      })
    }).then(() => { handleSuccess('删除成功') })
  }

  function resetSelectedUserPassword () {
    User.resource().reset(vm.selectedUserIds).$promise.then(() => {
      handleSuccess('重置成功')
    })
  }

  function exportSelectUser () {
    User.resource().export(vm.selectedUserIds).$promise.then((response) => {
      const file = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      const fileURL = URL.createObjectURL(file)
      $window.open(fileURL)
    }).then(() => {
      handleSuccess('导出成功')
    })
  }

  function handleSuccess (message) {
    ConfirmModal.open(message)
    clearCheckbox()
    vm.resetUserInfo()
  }

  function saveSuccess () {
    ConfirmModal.open('提交成功')
    vm.resetUserInfo()
  }

  function handleSelectedUser (confirmMessage, method) {
    vm.selectedUserIds = getSelectedUserId()
    if (vm.selectedUserIds.length !== 0) {
      ConfirmModal.open(confirmMessage).then(method)
    } else {
      ConfirmModal.open('请选择用户')
    }
  }

  function removeUserFromList (userId) {
    return vm.userInfoList.filter((user) => {
      return user.userId !== userId
    })
  }

  function clearCheckbox () {
    vm.selectedUserIds = null
    vm.isCheckedAll = false
    vm.userInfoList.forEach((userInfo) => {
      userInfo.selected = vm.isCheckedAll
    })
  }

  function getSelectedUserId () {
    return vm.userInfoList.filter((userInfo) => {
      return userInfo.selected === true
    }).map((userInfo) => {
      return userInfo.userId
    })
  }

  vm.resetUserInfo = () => {
    vm.userInfo = {}
    vm.isUpdate = false
    $scope.userInfoForm.$setPristine()
    $scope.userInfoForm.$setDirty()
  }

  vm.onChange = () => {
    clearCheckbox()
  }

  vm.toggleAll = () => {
    let status = vm.isCheckedAll
    vm.userInfoList.filter((user, index) => {
      if (vm.currentPage * vm.pageSize > index &&
        index >= (vm.currentPage - 1) * vm.pageSize) {
        return user
      }
    }).forEach((userInfo) => {
      userInfo.selected = status
    })
  }

  vm.optionToggled = () => {
    vm.isCheckedAll = vm.userInfoList.every((userInfo) => { return userInfo.selected })
  }
}

userManagementController.resolver = function ($q, User, RoleFromServer) {
  'ngInject'

  return $q.all({
    userInfoList: User.resource().query().$promise,
    roleList: RoleFromServer.query().$promise
  })
}

export default userManagementController
