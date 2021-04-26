//app.js
import { fetch } from './utils/request';

App({
  globalData: {
    // openId: null,
    // userInfo: null,
    // userDetailInfo: null,
    // host: 'http://localhost:8090'
  },

  onLaunch: function () {
    var that = this;
    that.init();
  },

  init: function () {
    var that = this;
    let openId = wx.getStorageSync('openId') || null;
    if (openId == null || openId == "") {
      wx.login({
        // 发送res.code到后台换取 openId, sessionKey, unionId
        success(res) {
          // console.log(res.code);
          if (res.code) {
            //获取用户唯一标识openid
            fetch({
              url: '/getWXOpenId',
              method: 'GET',
              data: { "code": res.code }
            }).then((res) => {
              console.log(res);
              var openId = res.data.openid;
              wx.setStorageSync('openId', openId);
              that.getUserDetailInfo(openId)
            })
          }
        }
      })
    } else {
      that.getUserDetailInfo(openId)
    }
  },

  getUserDetailInfo: function (openId) {
    let userDetailInfo = wx.getStorageSync('userDetailInfo') || null;
    if (userDetailInfo == null || userDetailInfo == "") {
      fetch({
        url: '/user/getUserByOpenId',
        method: 'GET',
        data: { "openId": openId }
      }).then((res) => {
        // console.log(res)
        wx.setStorageSync('userDetailInfo', res.data.data);
      })
    }
  }
})