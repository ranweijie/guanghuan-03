import './project-info.scss'

function ProjectCreateController ($element, $state, ConfirmModal, FormData) {
  'ngInject'

  let vm = this

  vm.requiredField = (field, form) => field.$error.required && (field.$dirty || form.$submitted)

  vm.submit = (form) => {
    form.$setSubmitted()
    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }
    let projectInfo = Object.assign({}, {'info': {'name': vm.project.name}}, { 'status': 'preparing' })
    createProject(projectInfo)
  }

  const createProject = (projectInfo) => {
    FormData.PROJECT.save(projectInfo).$promise
     .then(() => {
       saveSuccess()
     })
  }

  const saveSuccess = () => {
    ConfirmModal.open('创建成功').finally(navToProjectList)
  }

  function navToProjectList () {
    $state.go('static.projectList')
  }
}

export default ProjectCreateController
