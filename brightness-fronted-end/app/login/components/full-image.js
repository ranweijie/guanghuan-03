import angular from 'angular'
import template from 'raw!./full-image.html'
import {uniqueId, debounce} from 'lodash'
import './full-image.scss'

export default ($timeout) => {
  'ngInject'
  return new FullImage($timeout)
}

class FullImage {

  constructor ($timeout) {
    this.restrict = 'A'
    this.template = template
    this.replace = true
    this.scope = {
      fullImage: '='
    }
    this.$timeout = $timeout
  }

  compile () {
    return (scope, element) => {
      const resizeEventName = `resize.fulll-${uniqueId()}`

      const $content = element.parent()
      const image = new Image()

      const setStyle = (styles) => {
        this.$timeout(() => {
          scope.styles = styles
        })
      }

      const resize = () => {
        const width = image.width
        const height = image.height
        const ratio = width / height

        const contentWidth = $content.width()
        const contentHeight = $content.height()
        const contentRatio = contentWidth / contentHeight

        if (contentRatio >= ratio) {
          setStyle({
            width: contentWidth,
            height: contentWidth / ratio,
            top: -(contentWidth / ratio - contentHeight) / 2
          })
        } else {
          setStyle({
            height: contentHeight,
            width: contentHeight * ratio,
            left: -(contentHeight * ratio - contentWidth) / 2
          })
        }
        scope.image = image.src
      }

      image.onload = () => {
        resize()
        angular.element(window).on(resizeEventName, debounce(resize, 100))
      }

      image.src = scope.fullImage

      scope.$on('$destroy', () => {
        angular.element(window).off(resizeEventName)
      })
    }
  }
}
