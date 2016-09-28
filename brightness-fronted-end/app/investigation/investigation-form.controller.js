function InvestigationFormController ($element, $state, InvestigationData, FormData, ConfirmModal, CurrentProject) {
  'ngInject'

  let vm = this
  vm.investigation = InvestigationData.investigation

  vm.submitForm = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }
    submitInvestigation(vm.investigation)
  }

  vm.requiredField = (field, form) => field.$error.required && (field.$dirty || form.$submitted)

  const submitInvestigation = (investigationData) => {
    const currentProject = CurrentProject.getCurrentProject()
    FormData.INVESTIGATION.patch({project_status: currentProject.status, project_id: currentProject._id}, Object.assign({}, {investigation: investigationData})).$promise
      .then(saveSuccess)
  }

  const saveSuccess = () => {
    ConfirmModal.open('提交成功')
    $state.go('base.investigation.view')
  }
}

export default InvestigationFormController
