import dateBoxController from './date-box.controller'
import dateBoxTemplate from 'raw!./date-box.html'

export default {
  template: dateBoxTemplate,
  controller: dateBoxController,
  bindings: {
    date: '<'
  }
}
