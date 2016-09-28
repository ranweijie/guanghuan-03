import angular from 'angular'

import OperationSurveyRoutes from './operation-survey.routes'

import './operation-survey.scss'
import Roles from 'root/constant/roles'

export default angular
	.module(__filename, [])
  .config(OperationSurveyRoutes)
  .constant('Roles', Roles)

