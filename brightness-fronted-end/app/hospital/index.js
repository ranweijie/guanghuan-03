import angular from 'angular'
import hospitalRoutes from './hospital.routes'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .config(hospitalRoutes)
  .constant('Roles', Roles)
