function ParticipantsFormController ($element, $state, RoleCategory, ConfirmModal, FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()

  let vm = this
  vm.categories = RoleCategory.baseCategory

  let initParticipant = Object.assign({}, $state.params.participant, {project_id: CurrentProject.getProjectId()})
  vm.participant = categoryFormat(initParticipant)
  vm.submitForm = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }
    let currentParticipant = Object.assign({}, vm.participant, {category: parseInt(vm.participant.category, 10)})
    submitParticipant(currentParticipant)
  }
  vm.requiredField = (field, form) => {
    return field.$error.required && (field.$dirty || form.$submitted)
  }
  function submitParticipant (currentParticipant) {
    if (currentParticipant._id) {
      FormData.PROJECT_PARTICIPANT.put({project_status: currentProject.status, project_id: currentProject._id, id: currentParticipant._id}, currentParticipant).$promise
        .then(() => {
          saveSuccess()
          $state.go('base.participants.list')
        })
    } else {
      FormData.PROJECT_PARTICIPANT.save({project_status: currentProject.status, project_id: currentProject._id}, currentParticipant).$promise
        .then(() => {
          saveSuccess()
          $state.go('base.participants.list')
        })
    }
  }
  function saveSuccess () {
    ConfirmModal.open('提交成功')
  }
  function categoryFormat (initParticipant) {
    return initParticipant.category ? Object.assign({}, initParticipant,
      {category: initParticipant.category.toString()}) : initParticipant
  }
}

export default ParticipantsFormController
