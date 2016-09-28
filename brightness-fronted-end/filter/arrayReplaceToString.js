import { isEmpty } from 'lodash'

export default function () {
  'ngInject'

  return (array) => isEmpty(array) ? '' : array.join(', ')
}
