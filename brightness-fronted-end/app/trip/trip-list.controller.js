import './trip-list.scss'

import { remove } from 'lodash'

function TripListController (ConfirmModal, FormData, LoginUser, Roles, CurrentProject, TripList) {
  'ngInject'

  let vm = this

  vm.tripList = TripList._items || []

  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD) && !LoginUser.isVaildIdentity(Roles.ROLE_VOLUNTEER)

  vm.deleteTrip = (id) => {
    const currentProject = CurrentProject.getCurrentProject()
    FormData.TRIP.delete({ project_status: currentProject.status, project_id: currentProject._id, id }).$promise.then(() => {
      ConfirmModal.open('删除成功!')
      remove(vm.tripList, (trip) => trip._id === id)
    })
  }
}

TripListController.resolver = function ($q, FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.TRIP.get({ project_status: currentProject.status, project_id: currentProject._id }).$promise
}

export default TripListController
