export default ($scope, $uibModalInstance, message, options) => {
  'ngInject'

  $scope.message = message
  $scope.alertImg = require('./alert.png')
  $scope.isShowCancelBtn = options ? options.mode === 'confirm' : false

  $scope.ok = () => {
    $uibModalInstance.close()
  }

  $scope.cancel = () => {
    $uibModalInstance.dismiss()
  }
}
