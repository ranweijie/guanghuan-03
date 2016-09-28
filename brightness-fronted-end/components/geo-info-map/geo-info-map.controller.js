import infoPopover from 'raw!./infoPopover.html'

export default function ($scope, $element, $templateCache, $compile, $timeout) {
  'ngInject'

  let ctrl = this

  $scope.projectList = ctrl.projectList.map((project) => {
    project.coordinate = [project.investigation.location.longitude, project.investigation.location.latitude]
    project.info.schedule.start_date = new Date(project.info.schedule.start_date.replace(/-/g, '/'))
    project.info.schedule.end_date = new Date(project.info.schedule.end_date.replace(/-/g, '/'))
    return project
  })

  const mapContentEl = $element[0].querySelector('.geo-info-map-content')
  const map = new AMap.Map(mapContentEl, {zoom: 4})

  map.plugin(['AMap.ToolBar'], () => {
    map.addControl(new AMap.ToolBar({
      direction: false,
      offset: new AMap.Pixel(-10, 5)
    }))
  })

  const infoWindow = new AMap.InfoWindow({
    isCustom: true,
    offset: new AMap.Pixel(16, -45)
  })

  ctrl.projectList.forEach((project) => {
    const marker = new AMap.Marker({
      position: project.coordinate,
      map: map
    })
    marker.project = project
    marker.on('click', markerClick)
  })

  function markerClick (e) {
    $timeout(function () {
      $scope.project = e.target.project
      let linkFn = $compile(infoPopover)
      let linkedContent = linkFn($scope)
      infoWindow.setContent(linkedContent[0])
      infoWindow.open(map, e.target.getPosition())
    }, 0)
  }

  $scope.closeInfoWindow = function () {
    map.clearInfoWindow()
  }
}
