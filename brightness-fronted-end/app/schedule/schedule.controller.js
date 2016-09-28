
import {clone, orderBy} from 'lodash'

function ScheduleController ($filter, $state, $location, $scope, FormData, Participant, CurrentProject, RoleCategory) {
  'ngInject'

  // Temp fix for refresh on schedule detail page
  if (!$state.params.fromState && $location.url() === '/schedule/reviewDetail') {
    $state.go('base.reviewSchedule.list')
  }
  if (!$state.params.fromState && $location.url() === '/schedule/updateDetail') {
    $state.go('base.updateSchedule.list')
  }

  let vm = this
  vm.currentProject = CurrentProject.getCurrentProject()
  vm.participantList = orderBy(Participant._items, ['category'], ['desc']).filter((participant) => {
    return participant.is_team_leader === true
  })

  // schedule logic related
  vm.category = clone(RoleCategory.scheduleCategory)
  vm.category.unshift({name: '所有安排'})

  vm.toggleUpdate = false
  vm.selectedCategory = vm.category[0]
  vm.selectedDate = $state.params.selectedDate
  vm.fromState = $state.params.fromState
  vm.readOnly = $state.$current.data.readOnly || $state.params.readOnly

  if ($state.params.fromState) {
    _getScheduleInfo()
  }

  vm.saveSchedule = function () {
    if (!vm.toggleUpdate) {
      vm.toggleUpdate = true
      return
    }
    vm.scheduleInfo.date = $filter('date')(vm.selectedDate, 'yyyy-MM-dd')
    vm.scheduleInfo.category = vm.selectedCategory.id

    if (vm.scheduleInfo._id) {
      FormData.PROJECT_SCHEDULE.put({project_status: vm.currentProject.status, project_id: vm.currentProject._id, id: vm.scheduleInfo._id}, vm.scheduleInfo).$promise
        .then(() => {
          vm.toggleUpdate = false
        })
    } else {
      FormData.PROJECT_SCHEDULE.save({project_status: vm.currentProject.status, project_id: vm.currentProject._id}, vm.scheduleInfo).$promise
        .then(function (data) {
          vm.scheduleInfo = data
          vm.toggleUpdate = false
        })
    }
  }

  $scope.$watch('vm.selectedDate', function (newValue) {
    if (newValue) {
      var toState = $state.current.name.split('.')
      toState[2] = 'detail'
      $state.go(toState.join('.'), {
        selectedDate: newValue,
        readOnly: vm.readOnly,
        fromState: (vm.fromState || $state.current.name)
      })
    }
  })

  vm.selectCategory = function (selectedCategory) {
    vm.selectedCategory = selectedCategory
    _getScheduleInfo()
  }

  function _getScheduleInfo () {
    FormData.PROJECT_SCHEDULE.get({
      project_id: vm.currentProject._id,
      project_status: vm.currentProject.status,
      where: Object.assign({}, {category: vm.selectedCategory.id, date: $filter('date')(vm.selectedDate, 'yyyy-MM-dd')})
    }).$promise
      .then(function (data) {
        if (vm.selectedCategory.id) {
          if (data._items.length > 0) {
            vm.scheduleInfo = data._items[0]
          } else {
            vm.scheduleInfo = Object.assign({}, {project_id: vm.currentProject._id}, {date: vm.selectedDate}, {category: vm.selectedCategory.id})
          }
        } else {
          _parseScheduleInfoList(data._items)
        }
      })
      .catch(function (fallback) {
      })
  }

  function _parseScheduleInfoList (scheduleInfoList) {
    vm.allScheduleInfo = []
    vm.category.forEach(function (item) {
      if (item.id) {
        let scheduleInfo = {
          name: item.name
        }

        scheduleInfoList.forEach(function (schedule) {
          if (item.id === schedule.category) {
            scheduleInfo.content = schedule.content
          }
        })
        scheduleInfo.content = scheduleInfo.content ? scheduleInfo.content : '暂无'
        vm.allScheduleInfo.push(scheduleInfo)
      }
    })
  }
}

ScheduleController.resolver = function (FormData, CurrentProject) {
  'ngInject'
  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_PARTICIPANT.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

export default ScheduleController
