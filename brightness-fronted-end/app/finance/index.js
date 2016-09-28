import angular from 'angular'
import FinanceRoutes from './finance.routes'
import sao from 'root/sao'

export default angular
  .module(__filename, [sao.name])
  .config(FinanceRoutes)

