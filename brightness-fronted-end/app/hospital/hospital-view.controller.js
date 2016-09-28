import './hospital-view.scss'
import { isEmpty } from 'lodash'

function HospitalViewController (LoginUser, Roles, HospitalInfo, Attachment) {
  'ngInject'

  let vm = this
  vm.hospitalInfo = HospitalInfo
  if (HospitalInfo) {
    vm.hospitalInfo.photos = HospitalInfo.photos.filter((photo) => {
      return !isEmpty(photo)
    })
  }

  getAllImgSrc()

  vm.upQuote = require('root/images/up-quote.png')
  vm.downQuote = require('root/images/down-quote.png')

  vm.isNumber = angular.isNumber
  vm.showUpdateButton = !LoginUser.isVaildIdentity(Roles.ROLE_LEAD) && !LoginUser.isVaildIdentity(Roles.ROLE_VOLUNTEER)

  function getAllImgSrc () {
    if (vm.hospitalInfo.photos.length !== 0) {
      vm.hospitalInfo.photos.map((photo) => {
        return handlePhotoImgSrc(photo)
      })
    }
  }

  function handlePhotoImgSrc (photo) {
    let currentFile = photo.file
    Attachment.get(currentFile).success((data) => {
      const file = new Blob([data], {type: currentFile.content_type})
      photo.file = Object.assign({}, currentFile, {src: URL.createObjectURL(file)})
    })
  }
}

HospitalViewController.resolver = ($q, $stateParams, FormData, CurrentProject) => {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.HOSPITAL.get({ project_status: currentProject.status, project_id: currentProject._id, id: $stateParams.id, embedded: '{"photos":1}' }).$promise
}

export default HospitalViewController
