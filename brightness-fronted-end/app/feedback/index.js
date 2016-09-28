import angular from 'angular'
import FeedbackRoutes from './feedback.routes'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .config(FeedbackRoutes)
  .constant('Roles', Roles)
