import angular from 'angular'

import ScheduleRoutes from './schedule.routes'
import sao from 'root/sao'
import RoleCategory from 'root/constant/role-category'

import './schedule.scss'

export default angular
	.module(__filename, [sao.name])
  .constant('RoleCategory', RoleCategory)
  .config(ScheduleRoutes)
