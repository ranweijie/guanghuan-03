import angular from 'angular'
import sao from 'root/sao'
import LeaderTeam from 'root/constant/leader-team'
import Roles from 'root/constant/roles'
import ProjectStatus from 'root/constant/project-status'
import ProjectInfoRoutes from './project-info.routes'
import './project-info.scss'

export default angular
  .module(__filename, [sao.name])
  .constant('LeaderTeam', LeaderTeam)
  .constant('ProjectStatus', ProjectStatus)
  .constant('Roles', Roles)
  .config(ProjectInfoRoutes)
