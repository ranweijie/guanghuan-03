import './hotel-list.scss'

import {remove} from 'lodash'

function HotelListController (ConfirmModal, FormData, LoginUser, Roles, CurrentProject, HotelList, Attachment) {
  'ngInject'

  let vm = this

  vm.hotelList = HotelList._items || []

  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD) && !LoginUser.isVaildIdentity(Roles.ROLE_VOLUNTEER)

  vm.deleteHotel = (hotel) => {
    const currentProject = CurrentProject.getCurrentProject()
    FormData.HOTEL.delete({
      project_status: currentProject.status,
      project_id: currentProject._id,
      id: hotel._id
    }).$promise.then(() => {
      ConfirmModal.open('删除成功!')
      remove(vm.hotelList, (element) => element._id === hotel._id)
    }).then(() => {
      hotel.photos.forEach((photo) => { Attachment.delete(photo) })
    })
  }
}

HotelListController.resolver = function ($q, FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.HOTEL.get({project_status: currentProject.status, project_id: currentProject._id}).$promise
}

export default HotelListController
