import BarChartController from './bar-chart.controller'
import barChartTemplate from 'raw!./bar-chart.html'

export default {
  template: barChartTemplate,
  controller: BarChartController,
  bindings: {
    data: '<'
  }
}
