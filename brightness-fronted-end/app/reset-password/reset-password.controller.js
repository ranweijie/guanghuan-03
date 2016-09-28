export default function ($element, $scope, $http, User, ConfirmModal, LoginUser) {
  'ngInject'

  let vm = this

  vm.submitForm = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    if (vm.newPassword === vm.oldPassword) {
      ConfirmModal.open('新密码和原密码一致，请更换新密码')
      return
    }

    if (vm.newPassword !== vm.reNewPassword) {
      ConfirmModal.open('新密码两次输入不一致')
      return
    }

    resetPassword()
  }

  vm.requiredField = (field, form) => {
    return field.$error.required && (field.$dirty || form.$submitted)
  }

  vm.invalidNumber = (field, form) => {
    return (field.$error.number || field.$error.min || field.$error.max || field.$error.maxlength) &&
      (field.$dirty || form.$submitted)
  }

  // privates
  function resetPassword () {
    User.resource().resetPassword({
      oldPwd: btoa(vm.oldPassword),
      newPwd: btoa(vm.newPassword)
    }).$promise
      .then(() => {
        saveSuccess()
      })
  }

  function navToLogin () {
    LoginUser.logout()
  }

  function saveSuccess () {
    ConfirmModal.open('密码修改成功，请使用新密码登录').finally(navToLogin)
  }
}
