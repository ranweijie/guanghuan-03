import angular from 'angular'
import UserManageRoutes from './user-management.routes'

export default angular
  .module(__filename, [])
  .config(UserManageRoutes)
