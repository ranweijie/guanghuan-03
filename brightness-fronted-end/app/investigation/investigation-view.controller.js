import './investigation-view.scss'

function InvestigationViewController (LoginUser, Roles, InvestigationData) {
  'ngInject'

  let vm = this

  vm.upQuote = require('root/images/up-quote.png')
  vm.downQuote = require('root/images/down-quote.png')
  vm.investigationData = InvestigationData.investigation
  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD) && !LoginUser.isVaildIdentity(Roles.ROLE_VOLUNTEER)
}

InvestigationViewController.resolver = function (FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.INVESTIGATION.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

export default InvestigationViewController
