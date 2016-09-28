import angular from 'angular'
import geoMapTemplate from 'raw!./geo-map.html'
import './geo-map.scss'

export default () => {
  return {
    restrict: 'E',
    scope: {
      lng: '=',
      lat: '=',
      address: '=',
      draggable: '=',
      adjustHeight: '@'
    },
    template: geoMapTemplate,
    controller: ($scope, $window, $element, $timeout) => {
      'ngInject'

      const mapContentEl = $element[0].querySelector('.geo-map-content')
      const draggable = $scope.draggable
      $scope.getLocation = () => {
        if ($scope.lng && $scope.lat) {
          return '经度:' + $scope.lng + ', ' + '纬度:' + $scope.lat
        }
      }

      const map = new AMap.Map(mapContentEl, {zoom: 14})

      locateMap()

      var marker = createMarker(map, $scope.lng, $scope.lat)
      AMap.event.addListener(marker, 'dragend', onDragend)

      map.plugin(['AMap.ToolBar'], () => {
        map.addControl(new AMap.ToolBar({
          direction: false,
          offset: new AMap.Pixel(-10, 5)
        }))
      })

      AMap.plugin('AMap.Autocomplete', () => {
        var auto = new AMap.Autocomplete({input: 'tipinput'})

        AMap.event.addListener(auto, 'select', (e) => {
          if (e.poi && e.poi.location) {
            map.setZoom(15)
            map.setCenter(e.poi.location)

            updateLocationInfo(e.poi.location.lng, e.poi.location.lat, e.poi.address)

            map.remove(marker)// todo: update location only?

            marker = createMarker(map, e.poi.location.lng, e.poi.location.lat)
            AMap.event.addListener(marker, 'dragend', onDragend)
          }
        })
      })

      // privates
      function updateLocationInfo (lng, lat, address = '') {
        $scope.$apply(() => {
          $scope.lng = lng
          $scope.lat = lat
          $scope.address = address// todo:
        })
      }

      function onDragend (e) {
        updateLocationInfo(e.lnglat.lng, e.lnglat.lat)
      }

      function locateMap () {
        if ($scope.lng && $scope.lat) {
          map.setCenter([$scope.lng, $scope.lat])
        } else {
          $scope.lng = map.getCenter().lng
          $scope.lat = map.getCenter().lat
        }
      }

      function createMarker (map, lng, lat) {
        return new AMap.Marker({
          icon: '//webapi.amap.com/images/marker_sprite.png',
          position: new AMap.LngLat(lng, lat),
          draggable: draggable,
          cursor: 'move',
          map: map
        })
      }

      if ($scope.adjustHeight) {
        const $adustElem = angular.element($scope.adjustHeight)
        const $window = angular.element(window)
        const originHeight = angular.element(mapContentEl).height()
        const eventName = 'resize.geoMapAdjustHeight'
        $window.on(eventName, () => {
          const elementHeight = angular.element(mapContentEl).height()
          const otherHeight = angular.element(mapContentEl).parents('[class*="col-"]').height() - elementHeight
          angular.element(mapContentEl).height(
              Math.max($adustElem.height() - otherHeight, originHeight)
          )
        })
        $timeout(() => {
          $window.trigger(eventName)
        })
      }
    }
  }
}
