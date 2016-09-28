import angular from 'angular'
import hotelRoutes from './hotel.routes'
import Roles from 'root/constant/roles'

export default angular
  .module(__filename, [])
  .config(hotelRoutes)
  .constant('Roles', Roles)
