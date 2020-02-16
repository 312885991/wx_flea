//app.js
const updateManager = wx.getUpdateManager()
App({
  globalData: {
    openId: null,
    userInfo: null,
    userDetailInfo:null,
    host: 'https://quicklyweb.cn',
    // host:'https://localhost',
    status:false,
    count:0
  },
  onLaunch: function () {
    // 展示本地存储能力
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data) {
          that.globalData.userInfo = res.data
        }
      }
    });
    // 登录
    wx.login({
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      success(res) {
        if (res.code) {
          //获取用户唯一标识openid
          wx.request({
            url: that.globalData.host+'/getWXOpenId',// 后端登录接口请求地址
            data: { code: res.code },
            method: 'GET',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            //获取openId成功
            success(res) {
              // console.log(res)
              that.globalData.openId = res.data.openid
              //获取用户详情
              wx.request({
                url: that.globalData.host + '/user/getUserByOpenId',
                data: { openId: res.data.openid },
                method: 'GET',
                success(res) {
                  // console.log(res)
                  that.globalData.userDetailInfo = res.data.data
                }
              })
              //获取未读评论总数
              wx.request({
                url: that.globalData.host + '/discuss/getUnReadCount',
                data: {
                  "openId": res.data.openid
                },
                method: 'GET',
                success(res) {
                  //console.log(res.data.count)
                  that.globalData.count = res.data.count
                }
              })
            },
            fail(error){
              wx.showToast({
                title: '获取OPENID失败，请重启小程序',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }
    });
    wx.request({
      url: that.globalData.host + '/version/get',
      method: 'GET',
      success(res) {
        //console.log(res.data.data.status)
        that.globalData.status = res.data.data.status
      }
    });

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      //console.log(res.hasUpdate)
    }),

      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      }),

      updateManager.onUpdateFailed(function () {
        // 新版本下载失败
      })
  }
})