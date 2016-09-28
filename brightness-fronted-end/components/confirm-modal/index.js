import ModalTemplate from 'raw!./modal.html'
import ModalController from './modal.controller'

import './modal.scss'

export default ($uibModal) => {
  'ngInject'

  return {
    open (message, options) {
      return $uibModal.open({
        template: ModalTemplate,
        controller: ModalController,
        size: options || 'sm',
        resolve: {
          message () {
            return message
          },
          options () {
            return options
          }
        }
      }).result
    }
  }
}
