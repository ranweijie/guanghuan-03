import { isEmpty } from 'lodash'

export default () => {
  'ngInject'

  return (text) => (isEmpty(text) ? '暂无' : text)
}
