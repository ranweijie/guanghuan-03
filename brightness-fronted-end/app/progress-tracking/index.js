import angular from 'angular'

import sao from 'root/sao'
import ProgressTrackingRoutes from './progress-tracking.routes'
import './process-tracking.scss'

export default angular
  .module(__filename, [sao.name])
	.config(ProgressTrackingRoutes)
