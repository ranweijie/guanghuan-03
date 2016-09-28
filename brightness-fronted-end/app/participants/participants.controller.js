import {remove, clone, orderBy} from 'lodash'

import './participants.scss'

function ParticipantsController ($state, FormData, ConfirmModal, participantList, RoleCategory, LoginUser, Roles, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()

  let vm = this

  vm.currentPage = 1
  vm.pageSize = 10

  vm.categories = clone(RoleCategory.baseCategory)
  vm.categories.unshift({name: '全部人员'})
  vm.current = null

  vm.participantsList = orderBy(participantList._items || [], ['category'], ['desc'])
  vm.isEditable = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD)

  constructChartData(vm.participantsList)

  vm.toggleTeamLeader = function (participant) {
    participant.is_team_leader = !participant.is_team_leader

    return FormData.PROJECT_PARTICIPANT.patch({project_status: currentProject.status,
      project_id: currentProject._id,
      id: participant._id},
      Object.assign({}, {is_team_leader: participant.is_team_leader})).$promise
      .then(() => {
        if (!participant.is_team_leader) {
          ConfirmModal.open('组长取消成功!')
        } else {
          ConfirmModal.open('组长设置成功!')
        }
      }).catch(() => {
        participant.is_team_leader = !participant.is_team_leader
      })
  }

  vm.filterListBy = function (category) {
    vm.filter = category
  }

  vm.updateParticipant = function (participant) {
    $state.go('base.participants.form', {participant: participant})
  }

  vm.deleteParticipant = function (participant) {
    vm.current = participant
    const options = {
      size: 'sm',
      mode: 'confirm'
    }
    ConfirmModal.open('确认删除人员?', options).then(deleteParticipant)
  }

  function deleteParticipant () {
    FormData.PROJECT_PARTICIPANT.delete({project_status: currentProject.status, project_id: currentProject._id, id: vm.current._id}).$promise.then(() => {
      ConfirmModal.open('删除成功!')
      remove(vm.participantsList, function (participant) {
        return participant._id === vm.current._id
      })
      vm.current = null
      constructChartData(vm.participantsList)
    })
  }

  function constructChartData (participantList) {
    let participantNum = {}
    participantList.forEach(
      (participant) => {
        participantNum[participant.category] = (participantNum[participant.category] || 0) + 1
      })

    let chartValue = RoleCategory.baseCategory.map((category) => {
      return participantNum[category.id] ? participantNum[category.id] : 0
    })

    vm.chartData = {}
    vm.chartData.column = RoleCategory.baseCategory.map((category) => {
      return category.name
    })
    vm.chartData.value = chartValue
  }
}

ParticipantsController.resolver = function (FormData, CurrentProject) {
  'ngInject'
  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_PARTICIPANT.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

export default ParticipantsController
