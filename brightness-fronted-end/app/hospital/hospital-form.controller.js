import {isEmpty, remove} from 'lodash'

function HospitalFormController ($element, $state, $timeout, HospitalInfo, ConfirmModal, FormData, Attachment, CurrentProject) {
  'ngInject'

  let vm = this

  const currentProject = CurrentProject.getCurrentProject()
  vm.equipments = ['GGG', 'AAA', 'CCC']
  vm.departmentSets = ['有眼科', '有五官科，没有眼科', '没有五官科或者眼科']

  vm.showButton = !!HospitalInfo
  vm.investigation_hospital = HospitalInfo || Object.assign({equipments: []})

  vm.temporaryPhotos = vm.investigation_hospital.photos
    ? vm.investigation_hospital.photos.filter((photo) => {
      return !isEmpty(photo)
    }) : []
  getAllImgSrc()

  vm.deletePhotoIds = []

  vm.others = vm.investigation_hospital.equipments.find((equipment) => {
    if (!vm.equipments.includes(equipment)) {
      return equipment
    }
  })
  if (vm.others) {
    vm.investigation_hospital.equipments.splice(vm.investigation_hospital.equipments.indexOf(vm.others), 1)
  }

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
    if (vm.investigation_hospital._id) {
      vm.deletePhotoIds.push(vm.photoToDelete._id)
    } else {
      Attachment.delete(vm.photoToDelete._id)
    }
    remove(vm.temporaryPhotos, function (photo) {
      return photo._id === vm.photoToDelete._id
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

    submitInvestigationHospital()
  }

  function submitInvestigationHospital () {
    if (vm.others) {
      vm.investigation_hospital.equipments.push(vm.others)
    }
    vm.investigation_hospital.photos = getPhotoId()

    if (vm.investigation_hospital._id) {
      FormData.HOSPITAL.put({
        project_status: currentProject.status,
        project_id: currentProject._id,
        id: vm.investigation_hospital._id
      }, vm.investigation_hospital).$promise
        .then(saveSuccess, () => {
          if (vm.others) {
            vm.investigation_hospital.equipments.pop()
          }
        }).then(deleteAttachment)
    } else {
      FormData.HOSPITAL.save({
        project_status: currentProject.status,
        project_id: currentProject._id
      }, vm.investigation_hospital).$promise
        .then((response) => {
          vm.investigation_hospital = Object.assign({}, response)
        }).then(saveSuccess)
    }
  }

  function deleteAttachment () {
    vm.deletePhotoIds.forEach((photoId) => {
      Attachment.delete(photoId)
    })
  }

  function saveSuccess () {
    ConfirmModal.open('提交成功')
    $state.go('base.hospital.view', {id: vm.investigation_hospital._id})
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

  vm.invalidNumber = (field, form) => {
    return (field.$error.number || field.$error.min || field.$error.max) &&
      (field.$dirty || form.$submitted)
  }

  vm.requiredField = (field, form) => {
    return field.$error.required && (field.$dirty || form.$submitted)
  }
}

HospitalFormController.resolver = ($q, $stateParams, FormData, CurrentProject) => {
  'ngInject'

  if ($stateParams.id) {
    const currentProject = CurrentProject.getCurrentProject()
    return FormData.HOSPITAL.get({project_status: currentProject.status, project_id: currentProject._id, id: $stateParams.id, embedded: '{"photos":1}'}).$promise
  }
}

export default HospitalFormController
