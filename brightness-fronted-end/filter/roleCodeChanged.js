export default function () {
  'ngInject'

  return function (roleCode, roles) {
    return roles.filter(role => role.roleCode === roleCode).shift().roleName
  }
}
