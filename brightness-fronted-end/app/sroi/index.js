import angular from 'angular'
import SroiRoutes from './sroi.routes'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .config(SroiRoutes)
  .constant('Roles', Roles)
