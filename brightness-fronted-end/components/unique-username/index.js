export default ($q, User) => {
  'ngInject'

  return {
    require: 'ngModel',
    link: function ($scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.hnaUniqueUsername = function (modelValue, viewValue) {
        if ($scope.userInfoForm.userName.$dirty) {
          let userInput = modelValue || viewValue
          return User.resource().username({username: userInput}).$promise
            .then(function resolved () {
              return $q.reject('exist')
            }, function rejected () {
              return true
            })
        }
      }
    }
  }
}
