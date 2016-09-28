import angular from 'angular'
import tripRoutes from './trip.routes'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .config(tripRoutes)
  .constant('Roles', Roles)
