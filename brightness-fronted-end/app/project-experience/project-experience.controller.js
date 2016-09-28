function ProjectExperienceController ($element, CurrentProject, FormData, LoginUser, Roles, ConfirmModal, ProjectExperience) {
  'ngInject'

  let vm = this

  vm.experience = ProjectExperience.experience

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

    submitProjectExperience(vm.experience)
  }

  const submitProjectExperience = (projectExperience) => {
    const currentProject = CurrentProject.getCurrentProject()
    FormData.PROJECT_EXPERIENCE.patch({project_status: currentProject.status, project_id: currentProject._id}, Object.assign({}, {experience: projectExperience})).$promise
      .then(() => (ConfirmModal.open('提交成功')))
  }
}

ProjectExperienceController.resolver = (CurrentProject, FormData) => {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_EXPERIENCE.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

export default ProjectExperienceController
