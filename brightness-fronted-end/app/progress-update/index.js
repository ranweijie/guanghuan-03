import angular from 'angular'

import sao from 'root/sao'
import ProjectProgressRoutes from './project-progress.routes'

export default angular
  .module(__filename, [sao.name])
  .config(ProjectProgressRoutes)
