function OperationSurveyFormController ($element, $state, OperationSurvey, FormData, ConfirmModal, CurrentProject) {
  'ngInject'

  let vm = this
  const currentProject = CurrentProject.getCurrentProject()
  vm.operationSurvey = OperationSurvey.precheck || Object.assign({
    project_id: CurrentProject.getProjectId(), first_check: {methods: []}, second_check: {methods: []}
  })
  vm.methods = ['视力', '血压', '血常规']

  vm.toggleSelection = (method, checkMethods) => {
    let index = checkMethods.indexOf(method)
    if (index > -1) {
      checkMethods.splice(index, 1)
    } else {
      checkMethods.push(method)
    }
  }

  vm.submitForm = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    submitOperationSurvey()
  }

  vm.invalidNumber = (field, form) => {
    return (field.$error.number || field.$error.min || field.$error.max) &&
      (field.$dirty || form.$submitted)
  }

  function submitOperationSurvey () {
    FormData.PROJECT_PRE_CHECK.patch({project_status: currentProject.status, project_id: currentProject._id},
      Object.assign({}, {precheck: vm.operationSurvey})).$promise
      .then(saveSuccess)
  }

  const saveSuccess = () => {
    ConfirmModal.open('提交成功')
    $state.go('base.operationSurvey.view')
  }
}

OperationSurveyFormController.getOperationSurveyToForm = function (FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_PRE_CHECK.get({
    project_status: currentProject.status,
    project_id: currentProject._id
  }).$promise
}

export default OperationSurveyFormController
