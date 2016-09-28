import './cured-status-view.scss'

import { remove } from 'lodash'

function CuredStatusController (CuredNumbers, PatientList, FormData, LoginUser, Roles, ConfirmModal, CurrentProject) {
  'ngInject'

  let vm = this

  vm.curedNumbers = (CuredNumbers && CuredNumbers.cured_numbers) ? CuredNumbers.cured_numbers : 0
  vm.patientList = (PatientList && PatientList._items) ? PatientList._items : []

  vm.invalidNumber = (field, form) => (field.$error.number || field.$error.min || field.$error.max) && (field.$dirty || form.$submitted)

  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD) && !LoginUser.isVaildIdentity(Roles.ROLE_VOLUNTEER)

  vm.currentPage = 1
  vm.pageSize = 10
  vm.currentPatientList = vm.patientList.slice(0, vm.pageSize * vm.currentPage)

  vm.onChange = () => {
    vm.currentPatientList = vm.patientList.slice((vm.currentPage - 1) * vm.pageSize, vm.pageSize * vm.currentPage)
  }

  vm.submit = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      return
    }

    submitCuredNumbers(vm.curedNumbers)
  }

  vm.delete = (id) => {
    const currentProject = CurrentProject.getCurrentProject()
    FormData.PROJECT_PATIENT_INFO.delete({ project_status: currentProject.status, project_id: currentProject._id, id }).$promise
      .then(() => {
        ConfirmModal.open('删除成功!')
        remove(vm.patientList, (patient) => patient._id === id)
        vm.onChange()
      })
  }

  const submitCuredNumbers = (curedNumbers) => {
    const currentProject = CurrentProject.getCurrentProject()
    FormData.CURED_NUMBERS.patch({project_status: currentProject.status, project_id: currentProject._id}, Object.assign({}, {cured_numbers: curedNumbers})).$promise
      .then(() => (ConfirmModal.open('提交成功')))
  }
}

CuredStatusController.getCuredNumber = (FormData, CurrentProject) => {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.CURED_NUMBERS.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

CuredStatusController.getPatientList = (FormData, CurrentProject) => {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_PATIENT_INFO.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

export default CuredStatusController
