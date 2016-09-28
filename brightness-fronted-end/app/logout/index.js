import angular from 'angular'
import LogoutRoutes from './logout.routes'

export default angular
	.module(__filename, [])
  .config(LogoutRoutes)
