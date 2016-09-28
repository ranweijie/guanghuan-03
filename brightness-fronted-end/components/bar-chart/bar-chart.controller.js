import c3 from 'c3'
import 'c3/c3.min.css'

export default function ($element) {
  'ngInject'

  let ctrl = this

  ctrl.$onChanges = function (changesObj) {
    if (changesObj.data) {
      chart.load({
        columns: [
          ['x'].concat(ctrl.data.column),
          ['number'].concat(ctrl.data.value)
        ]
      })
    }
  }

  let chart = c3.generate({
    bindto: $element.find('.nha-bar-chart')[0],
    size: {
      height: 200
    },
    data: {
      x: 'x',
      columns: [
        ['x'].concat(ctrl.data.column),
        ['number'].concat(ctrl.data.value)
      ],
      type: 'bar',
      labels: true
    },
    axis: {
      x: {
        type: 'category',
        tick: {
          multiline: false
        }
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      show: false
    },
    color: {
      pattern: ['#539cef']
    }
  })
}
