import angular from 'angular'
import CuredStatusRoute from './cured-status.routes'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .config(CuredStatusRoute)
  .constant('Roles', Roles)
