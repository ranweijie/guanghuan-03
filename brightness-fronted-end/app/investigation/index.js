import angular from 'angular'
import InvestigationRoutes from './investigation.routes'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .config(InvestigationRoutes)
  .constant('Roles', Roles)
