import RoleCategory from 'root/constant/role-category'

export default function () {
  'ngInject'

  return function (roleCode) {
    return RoleCategory.baseCategory.filter((category) => {
      if (roleCode === category.id) {
        return category.name
      }
    })[0].name
  }
}
