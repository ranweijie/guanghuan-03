import angular from 'angular'
import LaunchCeremonyRoutes from './launch-ceremony.routes'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .config(LaunchCeremonyRoutes)
  .constant('Roles', Roles)
