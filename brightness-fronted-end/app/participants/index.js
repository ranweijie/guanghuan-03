import angular from 'angular'

import sao from 'root/sao'
import ParticipantsRoutes from './participants.routes'
import RoleCategory from 'root/constant/role-category'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [sao.name])
  .constant('RoleCategory', RoleCategory)
  .constant('Roles', Roles)
  .config(ParticipantsRoutes)
