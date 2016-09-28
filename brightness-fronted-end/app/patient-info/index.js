import angular from 'angular'
import PatientInfoRoutes from './patient-info.routes'

import './patient-info.scss'

export default angular
	.module(__filename, [])
  .config(PatientInfoRoutes)
