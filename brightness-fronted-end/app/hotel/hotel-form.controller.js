import {isEmpty, remove} from 'lodash'
function HotelFormController ($element, $state, $timeout, ConfirmModal, FormData, HotelInfo, Attachment, CurrentProject) {
  'ngInject'

  let vm = this
  const currentProject = CurrentProject.getCurrentProject()

  vm.meals = ['早餐', '午餐', '晚餐']
  vm.heatingSets = ['暖气', '空调']
  vm.networkConditions = ['有线网络及wifi', '只有有线网络', '只有wifi', '无网络']

  vm.showButton = !!HotelInfo
  vm.investigation_hotel = HotelInfo || Object.assign({meals: []}, {air_condition_type: []})

  if (HotelInfo) {
    vm.investigation_hotel.photos = HotelInfo.photos.filter((photo) => {
      return !isEmpty(photo)
    })
  }

  vm.airConditionOther = findOther(vm.investigation_hotel.air_condition_type, vm.heatingSets)
  if (vm.airConditionOther) {
    vm.investigation_hotel.air_condition_type.splice(
      vm.investigation_hotel.air_condition_type.indexOf(vm.airConditionOther), 1)
  }

  vm.temporaryPhotos = vm.investigation_hotel.photos
    ? vm.investigation_hotel.photos.filter((photo) => {
      return !isEmpty(photo)
    }) : []
  getAllImgSrc()

  vm.deletePhotoIds = []

  vm.uploadFiles = function (file, errFiles) {
    vm.errorFile = errFiles && errFiles[0]
    if (vm.errorFile) {
      showErrorMessage(vm.errorFile)
      return
    }
    if (vm.temporaryPhotos.length === 6) {
      ConfirmModal.open('最多上传6张照片')
      return
    }
    if (!file) {
      return
    }
    let photo = Object.assign({}, {file: file})
    Attachment.upload(photo.file)
      .then(function (response) {
        $timeout(function () {
          photo = response.data
          photo.file = Object.assign({}, photo.file, {src: URL.createObjectURL(file)})
          vm.temporaryPhotos.push(photo)
        })
      }, function (response) {
        if (response.status > 0) {
          ConfirmModal.open(response.status + ': ' + response.data)
        }
      }, function (evt) {
        photo.progress = parseInt(100.0 * evt.loaded / evt.total)
      })
  }

  vm.delete = function (photoToDelete) {
    vm.photoToDelete = photoToDelete
    const options = {
      size: 'sm',
      mode: 'confirm'
    }
    ConfirmModal.open('确认删除文件?', options).then(deletePhotoFromTemporary)
  }

  function deletePhotoFromTemporary () {
    if (vm.investigation_hotel._id) {
      vm.deletePhotoIds.push(vm.photoToDelete._id)
    } else {
      Attachment.delete(vm.photoToDelete._id)
    }
    remove(vm.temporaryPhotos, function (photo) {
      return photo._id === vm.photoToDelete._id
    })
  }

  function deleteAttachment () {
    vm.deletePhotoIds.forEach((photoId) => {
      Attachment.delete(photoId)
    })
  }

  vm.submitForm = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    submitInvestigationHotel()
  }
  vm.invalidNumber = (field, form) => {
    return (field.$error.number || field.$error.min || field.$error.max) &&
      (field.$dirty || form.$submitted)
  }

  vm.requiredField = (field, form) => {
    return field.$error.required && (field.$dirty || form.$submitted)
  }

  function submitInvestigationHotel () {
    if (vm.airConditionOther) {
      vm.investigation_hotel.air_condition_type.push(vm.airConditionOther)
    }
    vm.investigation_hotel.photos = getPhotoId()

    if (vm.investigation_hotel._id) {
      FormData.HOTEL.put({
        project_status: currentProject.status,
        project_id: currentProject._id,
        id: vm.investigation_hotel._id
      }, vm.investigation_hotel).$promise
        .then(saveSuccess, () => {
          if (vm.airConditionOther) {
            vm.investigation_hotel.air_condition_type.pop()
          }
        }).then(deleteAttachment)
    } else {
      FormData.HOTEL.save({
        project_status: currentProject.status,
        project_id: currentProject._id
      }, vm.investigation_hotel).$promise
        .then((response) => {
          vm.investigation_hotel = Object.assign({}, response)
        })
        .then(saveSuccess)
    }
  }

  function saveSuccess () {
    ConfirmModal.open('提交成功')
    $state.go('base.hotel.view', {id: vm.investigation_hotel._id})
  }

  function findOther (value, array) {
    return value.find((element) => {
      if (!array.includes(element)) {
        return element
      }
    })
  }

  function showErrorMessage (errorFile) {
    let errorMessage = ''
    switch (errorFile.$error) {
      case 'maxSize':
        errorMessage = '文件大小不能超过10M'
        break
      case 'pattern':
        errorMessage = '文件格式必须是PNG, JPG, JPEG或GIF'
        break
    }
    ConfirmModal.open(errorMessage)
  }

  vm.toggleSelection = (method, checkMethods) => {
    let index = checkMethods.indexOf(method)
    if (index > -1) {
      checkMethods.splice(index, 1)
    } else {
      checkMethods.push(method)
    }
  }

  function getPhotoId () {
    return vm.temporaryPhotos.map((photo) => {
      return photo._id
    })
  }

  function getAllImgSrc () {
    if (vm.temporaryPhotos.length !== 0) {
      vm.temporaryPhotos.map((photo) => {
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

HotelFormController.resolver = function ($stateParams, $q, FormData, CurrentProject) {
  'ngInject'

  if ($stateParams.id) {
    const currentProject = CurrentProject.getCurrentProject()
    return FormData.HOTEL.get({
      project_status: currentProject.status,
      project_id: currentProject._id,
      id: $stateParams.id,
      embedded: {'photos': 1}
    }).$promise
  }
}
export default HotelFormController
