export default function ($resource) {
  'ngInject'
  return $resource('/wechat/token', {}, {
    autologin: {url: '/wechat/autologin', method: 'POST'}
  })
}
