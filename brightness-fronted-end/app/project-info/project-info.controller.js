import { isEmpty } from 'lodash'

function ProjectInfoController (ProjectInfo, LeaderTeam, LoginUser, Roles) {
  'ngInject'

  ProjectInfo.info = ProjectInfo.info ? ProjectInfo.info : Object.assign({}, {info: {}})

  let vm = this

  let projectMembers = isEmpty(ProjectInfo.info.project_members)
    ? LeaderTeam
    : ProjectInfo.info.project_members.map((member) =>
        Object.assign({}, member, { title: LeaderTeam.find((leader) => (member.leader_team_id === leader.id)).title }))

  vm.project = Object.assign({}, ProjectInfo.info, { project_members: projectMembers })

  vm.corperationBg = require('root/images/corperation.png')
  vm.peopleBg = require('root/images/people.png')
  vm.upQuote = require('root/images/up-quote.png')
  vm.downQuote = require('root/images/down-quote.png')
  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD)
}

ProjectInfoController.getProjectInfo = function ($q, FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_INFO.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

export default ProjectInfoController
