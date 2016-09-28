import angular from 'angular'
import sao from 'root/sao'
import fullImage from './components/full-image'
import loginRoutes from './login.routes'

export default angular
  .module(__filename, [sao.name])
  .directive('fullImage', fullImage)
  .config(loginRoutes)
