import angular from 'angular'
import ProjectExperienceRoute from './project-experience.routes'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .config(ProjectExperienceRoute)
  .constant('Roles', Roles)
