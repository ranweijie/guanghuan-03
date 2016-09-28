import angular from 'angular'
import config from 'config'
import styles from './helper.scss'
import * as is from 'root/constant/is'

export default class wechatService {
  constructor () {
    'ngInject'
  }

  openInWeixin = is.openInWeixin

  ready (fn) {
    if (this.openInWeixin) {
      return wx.ready(fn)
    } else {
      window.setTimeout(fn, 200)
    }
  }

  registerShare (info) {
    if (!this.openInWeixin) {
      return false
    }

    var obj = Object.assign({
      appId: config.wechatAppId,
      fail: function () {
        alert('分享失败，不要紧，可能是网络问题，一会儿再试试？')
      },
      success: function () {
      }
    }, info)

    this.ready(function () {
      wx.onMenuShareAppMessage(obj)
      wx.onMenuShareQQ(obj)
      wx.onMenuShareWeibo(obj)
      var timeLineObj = Object.assign({}, obj, {
        title: obj.desc
      })
      wx.onMenuShareTimeline(timeLineObj)
    })
  }

  hideSharebutton () {
    if (!this.openInWeixin) {
      return false
    }
    wx.hideMenuItems({
      menuList: [
        'menuItem:share:appMessage',
        'menuItem:share:timeline',
        'menuItem:share:qq',
        'menuItem:share:weiboApp',
        'menuItem:share:facebook'
      ]
    })
  }

  showSharebutton () {
    if (!this.openInWeixin) {
      return false
    }
    wx.showMenuItems({
      menuList: [
        'menuItem:share:appMessage',
        'menuItem:share:timeline',
        'menuItem:share:qq',
        'menuItem:share:weiboApp',
        'menuItem:share:facebook'
      ]
    })
  }

  setTitle (title) {
    if (!this.openInWeixin) {
      return false
    }

    document.title = title

    const $iframe =
      angular.element('<iframe></iframe>')
        .addClass(styles.iframe)
        .attr('src', require('file!./index.js'))
        .on('load', function () {
          window.setTimeout(function () {
            $iframe.off('load').remove()
          }, 0)
        })
    angular.element(document.body).append($iframe)
  }
}
