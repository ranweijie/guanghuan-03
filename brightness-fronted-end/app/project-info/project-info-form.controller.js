import './project-info-form.scss'
import _ from 'lodash'

function ProjectInfoFormController ($element, $state, ConfirmModal, FormData, ProjectInfo, LeaderTeam, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()

  let vm = this

  vm.project = Object.assign({}, ProjectInfo.info, { project_members: mapTitleToProjectMembers(ProjectInfo.info, LeaderTeam) })

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

    let currentProjectInfo = Object.assign({}, vm.project, { project_members: removeTitleFromProjectMembers(vm.project) })

    updateProjectInfo(currentProjectInfo)
  }

  const updateProjectInfo = (currentProjectInfo) => {
    FormData.PROJECT_INFO.patch({project_status: currentProject.status, project_id: currentProject._id}, Object.assign({}, {info: currentProjectInfo})).$promise
      .then(saveSuccess)
  }

  const saveSuccess = () => {
    CurrentProject.setCurrentProject(Object.assign({},
      currentProject,
      {name: vm.project.name},
      {location: vm.project.location},
      {schedule: {start_date: vm.project.schedule ? vm.project.schedule.start_date : null,
        end_date: vm.project.schedule ? vm.project.schedule.end_date : null}}))
    ConfirmModal.open('提交成功')
    $state.go('base.projectInfo.view')
  }
}

const mapTitleToProjectMembers = (projectInfo, leaderTeam) => {
  return _.isEmpty(projectInfo.project_members)
    ? leaderTeam.map((member) => _.omit(Object.assign({}, member, { leader_team_id: member.id, name: '', phone: '' }), ['id']))
    : projectInfo.project_members.map((member) =>
        Object.assign({}, member, { title: leaderTeam.find((leader) => (member.leader_team_id === leader.id)).title }))
}

const removeTitleFromProjectMembers = (projectInfo) =>
  _(projectInfo.project_members)
    .map((member) => _.omit(member, ['title']))
    .sortBy('leader_team_id')
    .value()

export default ProjectInfoFormController
