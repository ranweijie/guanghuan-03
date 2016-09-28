
function OperationSurveyViewController (OperationSurvey, LoginUser, Roles) {
  'ngInject'

  let vm = this
  vm.operationSurvey = OperationSurvey.precheck

  vm.upQuote = require('root/images/up-quote.png')
  vm.downQuote = require('root/images/down-quote.png')
  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD)
}

// for route resolve
OperationSurveyViewController.getOperationSurveyToView = function (FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_PRE_CHECK.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

export default OperationSurveyViewController
