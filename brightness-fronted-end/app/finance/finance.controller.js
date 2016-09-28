import './finance.scss'
import {isEmpty, remove, clone, omit, uniqBy} from 'lodash'

function FinanceController ($element, $scope, $timeout, $filter, Attachment, FinanceData, FormData, CurrentProject, ConfirmModal) {
  'ngInject'

  FinanceData.FinanceInfo.finance = FinanceData.FinanceInfo.finance ? FinanceData.FinanceInfo.finance : Object.assign({}, {finance: {}})
  const currentProject = CurrentProject.getCurrentProject()

  const NONE_FILTER_OPTION = '全部记录'

  let vm = this
  vm.finance = FinanceData.FinanceInfo.finance
  vm.docList = FinanceData.FinanceInfo.finance.doc
    ? FinanceData.FinanceInfo.finance.doc.filter((element) => {
      return !isEmpty(element)
    }) : []
  vm.financeUsageList = FinanceData.FinanceUsage._items || []

  vm.currentPage = 1
  vm.pageSize = 10
  vm.totalAccount = 0

  $scope.$watch('vm.financeUsageList', (financeUsageList) => {
    vm.totalAccount = 0
    financeUsageList.forEach((financeUsage, index) => {
      vm.totalAccount += financeUsage.amount || 0
      financeUsage.index = index
    })

    vm.financeUsageOption = uniqBy(financeUsageList, 'usage').map((financeUsage) => {
      return financeUsage.usage
    })
    vm.financeUsageFilterOption = clone(vm.financeUsageOption || [])
    vm.financeUsageFilterOption.unshift(NONE_FILTER_OPTION)
  }, true)

  vm.invalidNumber = (field, form) => (field.$error.number || field.$error.min || field.$error.max || field.$error.maxlength) && (field.$dirty || form.$submitted)

  vm.filterListBy = function (usage) {
    vm.filter = usage === NONE_FILTER_OPTION ? undefined : usage

    let filteredList = vm.financeUsageList.filter((financeUsage) => {
      return financeUsage.usage === usage
    })
    calculateTotalAccount(usage === NONE_FILTER_OPTION ? vm.financeUsageList : filteredList)
  }

  vm.editFinanceUsage = (item) => {
    item.isEditing = true
  }

  vm.addFinanceUsage = () => {
    vm.filter = undefined
    vm.financeUsageList.unshift({isEditing: true, index: vm.financeUsageList, has_invoice: true, date: $filter('date')(new Date(), 'yyyy/MM/dd')})
    $scope.feeUsageForm.$setPristine()
  }

  vm.setHasInvoice = (item, hasInvoice) => {
    item.has_invoice = hasInvoice
  }

  vm.deleteFinanceUsage = (item) => {
    vm.FinanceUsageToDelete = item
    const options = {
      size: 'sm',
      mode: 'confirm'
    }
    ConfirmModal.open('确认删除?', options).then(deleteFinanceUsage)
  }

  function deleteFinanceUsage () {
    if (!vm.FinanceUsageToDelete._id) {
      remove(vm.financeUsageList, function (financeUsage) {
        return financeUsage.index === vm.FinanceUsageToDelete.index
      })
      return
    }
    if (vm.financeUsageList.length === 1 && !vm.financeUsageList[0]._id) {
      return
    } else {
      FormData.PROJECT_FINANCE_USAGE.delete({
        project_status: currentProject.status,
        project_id: currentProject._id,
        id: vm.FinanceUsageToDelete._id
      }).$promise
        .then(() => {
          remove(vm.financeUsageList, function (financeUsage) {
            return financeUsage.index === vm.FinanceUsageToDelete.index
          })
          if (isEmpty(vm.financeUsageList)) {
            vm.financeUsageList.push({isEditing: true, has_invoice: true, date: $filter('date')(new Date(), 'yyyy/MM/dd')})
          }
        })
    }
  }

  vm.saveFinanceUsage = (feeUsageForm, item) => {
    feeUsageForm.$setSubmitted()
    if (feeUsageForm.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    if (!item._id) {
      FormData.PROJECT_FINANCE_USAGE.save({
        project_status: currentProject.status,
        project_id: currentProject._id
      }, Object.assign({}, omit(item, ['isEditing', 'index']), {project_id: currentProject._id})).$promise
        .then(() => {
          $scope.feeUsageForm.$setPristine()
          item.isEditing = false
        })
    } else {
      FormData.PROJECT_FINANCE_USAGE.put({
        project_status: currentProject.status,
        project_id: currentProject._id,
        id: item._id
      }, Object.assign({}, omit(item, ['isEditing', 'index']))).$promise
        .then(() => {
          $scope.feeUsageForm.$setPristine()
          item.isEditing = false
        })
    }
  }

  vm.setUsage = (item, usageOption) => {
    item.usage = usageOption
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
    updateFinance().then(saveSuccess)
  }

  vm.requiredField = (field, form) => field.$error.required && (field.$dirty || form.$submitted)

  vm.uploadFile = function (file, errFiles) {
    vm.errorFile = errFiles && errFiles[0]
    if (vm.errorFile) {
      showErrorMessage(vm.errorFile)
      return
    }
    if (vm.docList.length === 5) {
      ConfirmModal.open('最多上传5个文件')
      return
    }
    if (!file) {
      return
    }

    let doc = Object.assign({}, {file: file})
    vm.docList.push(doc)

    Attachment.upload(doc.file)
      .then(function (response) {
        $timeout(function () {
          doc = Object.assign(doc, response.data)
          updateFinance(true)
        })
      }, function (response) {
        if (response.status > 0) {
          ConfirmModal.open(response.status + ': ' + response.data)
          vm.docList.pop()
        }
      }, function (evt) {
        doc.progress = parseInt(100.0 * evt.loaded / evt.total)
      })
  }

  vm.downloadFile = function (file) {
    Attachment.download(file)
  }

  vm.delete = function (docToDelete) {
    vm.docToDelete = docToDelete
    const options = {
      size: 'sm',
      mode: 'confirm'
    }
    ConfirmModal.open('确认删除文件?', options).then(deleteAttachment)
  }

  function deleteAttachment () {
    Attachment.delete(vm.docToDelete._id)
      .then(() => {
        remove(vm.docList, function (doc) {
          return doc._id === vm.docToDelete._id
        })
      })
      .then(() => {
        updateFinance(true).then(ConfirmModal.open('删除成功!'))
      })
  }

  function calculateTotalAccount (financeUsageList) {
    vm.totalAccount = 0
    financeUsageList.forEach((financeUsage) => {
      vm.totalAccount += financeUsage.amount || 0
    })
  }

  function updateFinance (isUpdateAttachment) {
    let financeToUpdate = {}

    if (isUpdateAttachment) {
      let doc = vm.docList.map((doc) => {
        return doc._id
      })
      financeToUpdate = Object.assign({}, {finance: {doc: doc}})
    } else {
      financeToUpdate = Object.assign({}, {
        finance: {
          content: FinanceData.FinanceInfo.finance.content,
          cost: FinanceData.FinanceInfo.finance.cost,
          budget: FinanceData.FinanceInfo.finance.budget
        }
      })
    }
    return FormData.PROJECT_FINANCE.patch({
      project_status: currentProject.status,
      project_id: currentProject._id
    }, financeToUpdate).$promise
  }

  function showErrorMessage (errorFile) {
    let errorMessage = ''
    switch (errorFile.$error) {
      case 'maxSize':
        errorMessage = '文件大小不能超过20M'
        break
      case 'pattern':
        errorMessage = '文件格式必须是Word, Excel或PDF'
        break
    }
    ConfirmModal.open(errorMessage)
  }

  function saveSuccess () {
    ConfirmModal.open('保存成功')
  }
}

FinanceController.resolver = function ($q, FormData, CurrentProject) {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return $q.all({
    FinanceInfo: FormData.PROJECT_FINANCE.get({
      project_status: currentProject.status,
      project_id: currentProject._id,
      embedded: '{"finance.doc":1}'
    }).$promise,
    FinanceUsage: FormData.PROJECT_FINANCE_USAGE.get({
      project_status: currentProject.status,
      project_id: currentProject._id
    }).$promise
  })
}

export default FinanceController
