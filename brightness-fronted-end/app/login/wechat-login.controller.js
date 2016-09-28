export default function ($cookies, $state, WechatToken, LocalStorage, LoginUser) {
  'ngInject'

  const wechatToken = LocalStorage.get('wechat_token')

  if (!wechatToken) {
    $state.go('login')
    return
  }

  // 微信公众号里自动登录
  WechatToken.autologin(getParams()).$promise
    .then((token) => {
      LoginUser.setUser(token)
      LocalStorage.set('wechat_token', token['wechat_token'])
      $state.go('base.home')
    })
    .catch(() => {
      $state.go('login')
    })

  // privates
  function getParams () {
    const openid = $cookies.get('openid')
    return {openid, 'wechat_token': wechatToken}
  }
}
