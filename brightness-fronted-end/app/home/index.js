import angular from 'angular'
import HomeRoute from './home.routes'
import ProjectStatus from 'root/constant/project-status'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .constant('ProjectStatus', ProjectStatus)
  .constant('Roles', Roles)
  .config(HomeRoute)
