import GeoInfoMapController from './geo-info-map.controller'
import GeoInfoMapTemplate from 'raw!./geo-info-map.html'

import './geo-info-map.scss'

export default {
  template: GeoInfoMapTemplate,
  controller: GeoInfoMapController,
  bindings: {
    projectList: '<'
  }
}
