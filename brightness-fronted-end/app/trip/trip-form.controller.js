function TripFormController ($element, $state, TripInfo, ConfirmModal, FormData, CurrentProject, LoginUser, Roles) {
  'ngInject'

  let vm = this

  vm.tripInfo = Object.assign({}, TripInfo, { project_id: CurrentProject.getProjectId() })
  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD) && !LoginUser.isVaildIdentity(Roles.ROLE_VOLUNTEER)

  vm.submit = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    saveTripFormData(vm.tripInfo)
  }

  const saveTripFormData = (tripFormData) => {
    const currentProject = CurrentProject.getCurrentProject()
    if (tripFormData._id) {
      FormData.TRIP.put({ project_status: currentProject.status, project_id: currentProject._id, id: tripFormData._id }, tripFormData).$promise
        .then(saveSuccess)
    } else {
      FormData.TRIP.save({ project_status: currentProject.status, project_id: currentProject._id }, tripFormData).$promise
        .then(saveSuccess)
    }
  }

  const saveSuccess = () => {
    ConfirmModal.open('提交成功')
    $state.go('base.trip.list')
  }
}

TripFormController.resolver = ($stateParams, FormData, CurrentProject) => {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return $stateParams.id
    ? FormData.TRIP.get({ project_status: currentProject.status, project_id: currentProject._id, id: $stateParams.id }).$promise
    : {}
}

export default TripFormController
