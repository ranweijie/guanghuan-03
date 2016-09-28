import './hospital-list.scss'

import { remove } from 'lodash'

function HospitalListController (ConfirmModal, FormData, LoginUser, Roles, CurrentProject, HospitalList, Attachment) {
  'ngInject'

  let vm = this

  vm.hospitalList = HospitalList._items || []

  vm.deleteHospital = (hospital) => {
    const currentProject = CurrentProject.getCurrentProject()
    FormData.HOSPITAL.delete({ project_status: currentProject.status, project_id: currentProject._id, id: hospital._id }).$promise.then(() => {
      ConfirmModal.open('删除成功!')
      remove(vm.hospitalList, (element) => element._id === hospital._id)
    }).then(() => {
      hospital.photos.forEach((photo) => {
        Attachment.delete(photo)
      })
    })
  }
  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD) && !LoginUser.isVaildIdentity(Roles.ROLE_VOLUNTEER)
}

HospitalListController.resolver = function ($q, FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.HOSPITAL.get({ project_status: currentProject.status, project_id: currentProject._id }).$promise
}

export default HospitalListController
