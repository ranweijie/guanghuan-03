import {omit} from 'lodash'
import './project-progress.scss'

function ProjectProgressController ($element, FormData, ConfirmModal, projectProgressData, CurrentProject) {
  'ngInject'

  let vm = this

  vm.currentProject = CurrentProject.getCurrentProject()

  vm.data = projectProgressData._items ? omit(projectProgressData._items[0], ['_id']) : Object.assign({}, {project_id: vm.currentProject._id})

  vm.submitForm = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    saveFormData().then(saveSuccess)
  }

  vm.requiredField = (field, form) => {
    return field.$error.required && (field.$dirty || form.$submitted)
  }

  vm.invalidNumber = (field, form) => {
    return (field.$error.number || field.$error.min || field.$error.max || field.$error.maxlength) &&
      (field.$dirty || form.$submitted)
  }
  // privates
  function saveFormData () {
    return FormData.PROJECT_PROGRESS.save({project_status: vm.currentProject.status, project_id: vm.currentProject._id}, vm.data).$promise
  }

  function saveSuccess () {
    ConfirmModal.open('保存成功')
  }
}

ProjectProgressController.resolver = function (FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_PROGRESS.get({
    project_status: currentProject.status,
    project_id: currentProject._id,
    page: 1,
    max_results: 1,
    sort: '[("_created",-1)]'
  }).$promise
}

export default ProjectProgressController
