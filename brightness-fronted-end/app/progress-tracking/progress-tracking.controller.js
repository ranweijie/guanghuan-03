function ProgressTrackingController (Datas, CurrentProject) {
  'ngInject'

  let vm = this

  vm.currentProject = CurrentProject.getCurrentProject()
  vm.progressInfo = Datas.Progress._items ? Datas.Progress._items[0] : []
  vm.launchInfo = Datas.LaunchCeremony.launch_ceremony
  vm.operationSurveyInfo = Datas.OperationSurvey.precheck
}

// for route resolve
ProgressTrackingController.resolver = function ($q, FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return $q.all({
    Progress: FormData.PROJECT_PROGRESS.get({project_status: currentProject.status, project_id: currentProject._id, page: 1, max_results: 1, sort: '[("_created",-1)]'}).$promise,
    LaunchCeremony: FormData.PROJECT_LAUNCH_CEREMONY.get({project_status: currentProject.status, project_id: currentProject._id}).$promise,
    OperationSurvey: FormData.PROJECT_PRE_CHECK.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
  })
}

export default ProgressTrackingController
