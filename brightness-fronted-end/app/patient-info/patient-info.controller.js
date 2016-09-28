function PatientInfoController ($element, $state, $scope, FormData, ConfirmModal, CurrentProject, PatientInfo) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()

  let vm = this

  vm.patientInfo = PatientInfo

  vm.submitForm = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    saveFormData(vm.patientInfo)
  }

  vm.requiredField = (field, form) => field.$error.required && (field.$dirty || form.$submitted)

  vm.invalidNumber = (field, form) => (field.$error.number || field.$error.min || field.$error.max || field.$error.maxlength) && (field.$dirty || form.$submitted)

  function saveFormData (patientInfo) {
    if (patientInfo._id) {
      FormData.PROJECT_PATIENT_INFO.save({ project_status: currentProject.status, project_id: currentProject._id, id: patientInfo._id }, patientInfo).$promise
        .then(() => (saveSuccess(patientInfo._id)))
    } else {
      FormData.PROJECT_PATIENT_INFO.save({ project_status: currentProject.status, project_id: currentProject._id }, patientInfo).$promise
        .then(() => (saveSuccess()))
    }
  }

  const saveSuccess = (id = null) => {
    ConfirmModal.open('提交成功')
    if (id) {
      $state.go('base.curedStatus.view')
    } else {
      vm.patientInfo = {}
      $scope.patientInfoForm.$setPristine()
    }
  }
}

PatientInfoController.getPatientInfo = ($stateParams, FormData, CurrentProject) => {
  'ngInject'

  if ($stateParams.id) {
    const currentProject = CurrentProject.getCurrentProject()
    return FormData.PROJECT_PATIENT_INFO.get({
      project_status: currentProject.status,
      project_id: currentProject._id,
      id: $stateParams.id
    }).$promise
  } else {
    return {}
  }
}

export default PatientInfoController
