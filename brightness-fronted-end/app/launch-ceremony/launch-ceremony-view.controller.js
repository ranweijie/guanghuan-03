import './launch-ceremony-view.scss'

function LaunchCeremonyViewController (launchCeremonyData, LoginUser, Roles) {
  'ngInject'

  launchCeremonyData.launch_ceremony = launchCeremonyData.launch_ceremony ? launchCeremonyData.launch_ceremony : Object.assign({}, {launch_ceremony: {}})

  let vm = this

  vm.launchCeremony = launchCeremonyData.launch_ceremony
  vm.messageBg = require('root/images/message.png')
  vm.peopleBg = require('root/images/people.png')
  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD) && !LoginUser.isVaildIdentity(Roles.ROLE_VOLUNTEER)
  vm.isNumber = angular.isNumber
}

// for route resolve
LaunchCeremonyViewController.resolver = function (FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_LAUNCH_CEREMONY.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

export default LaunchCeremonyViewController
