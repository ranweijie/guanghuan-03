import './launch-ceremony-form.scss'

import { isEmpty, remove, pullAt } from 'lodash'

function LaunchCeremonyFormController ($element, $state, ConfirmModal, FormData, CurrentProject, launchCeremonyData) {
  'ngInject'

  launchCeremonyData.launch_ceremony = launchCeremonyData.launch_ceremony ? launchCeremonyData.launch_ceremony : Object.assign({}, {launch_ceremony: {}})

  let vm = this

  vm.launchCeremony = (isEmpty(launchCeremonyData.launch_ceremony) || isEmpty(launchCeremonyData.launch_ceremony.agenda))
    ? Object.assign({}, launchCeremonyData.launch_ceremony, { agenda: [{}] })
    : launchCeremonyData.launch_ceremony

  vm.requiredField = (field, form) => field.$error.required && (field.$dirty || form.$submitted)

  vm.invalidNumber = (field, form) => (field.$error.number || field.$error.min || field.$error.max) && (field.$dirty || form.$submitted)

  vm.addItemToAgenda = (itemIndex) => {
    let firstPart = vm.launchCeremony.agenda.slice(0, itemIndex + 1)
    firstPart.push({})
    let secondPart = vm.launchCeremony.agenda.slice(itemIndex + 1)
    vm.launchCeremony.agenda = firstPart.concat(secondPart)
  }

  vm.deleteItemFromAgenda = (itemIndex) => {
    pullAt(vm.launchCeremony.agenda, itemIndex)
    if (isEmpty(vm.launchCeremony.agenda)) {
      vm.launchCeremony.agenda.push({})
    }
  }

  vm.cancel = () => (redirectToLaunchCeremonyPage())

  vm.submit = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    remove(vm.launchCeremony.agenda, (item) => isEmpty(item))
    vm.launchCeremony = Object.assign({}, vm.launchCeremony, { project_id: CurrentProject.getProjectId() })
    updateLaunchCeremonyData(vm.launchCeremony)
  }

  const updateLaunchCeremonyData = (launchCeremonyData) => {
    const currentProject = CurrentProject.getCurrentProject()
    return FormData.PROJECT_LAUNCH_CEREMONY.patch({project_status: currentProject.status, project_id: currentProject._id},
      Object.assign({}, {launch_ceremony: launchCeremonyData})).$promise
      .then(() => {
        saveSuccess()
        redirectToLaunchCeremonyPage()
      })
  }

  const saveSuccess = () => ConfirmModal.open('提交成功')

  const redirectToLaunchCeremonyPage = () => $state.go('base.launchCeremonyView')
}

export default LaunchCeremonyFormController
