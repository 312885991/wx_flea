// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userDetailInfo: null,
    status:false,
    count: 0
  },

  showUserInfo: function () {
    wx.navigateTo({
      url: 'userInfo/userInfo'
    })
  },

  getuserinfo: function (event) {
    //console.log(event)
    var that = this;
    that.setData({
      userInfo: event.detail.userInfo
    })
    app.globalData.userInfo = this.data.userInfo
    // 将用户信息 存储到本地
    wx.setStorage({
      key: "userInfo",
      data: this.data.userInfo
    })
  },

  toEdit: function (event) {
    //console.log(event)
    var userInfo = event.currentTarget.id
    console.log(userInfo)
    if (userInfo == '' || userInfo == null) {
      wx.showToast({
        title: '用户授权后才能编辑个人信息哦',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: 'edit/edit'
      })
    }
  },

  toPublication: function (event) {
    //console.log(event.currentTarget.dataset.set)
    var userDetailInfo = event.currentTarget.dataset.set
    var userInfo = event.currentTarget.id
    //console.log(userInfo)
    if (userInfo == '' || userInfo == null) {
      wx.showToast({
        title: '用户授权后才能发布商品哦',
        icon: 'none',
        duration: 3000
      });
    } else if (userDetailInfo == null) {
      wx.showToast({
        title: '完善个人信息后才能发布商品哦',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: 'publication/publication',
      })
    }
  },

  toMyPush: function (event) {
    var userDetailInfo = event.currentTarget.dataset.set
    var userInfo = event.currentTarget.id
    //console.log(userInfo)
    if (userInfo == '' || userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 2000
      });
    } else if (userDetailInfo == null) {
      wx.showToast({
        title: '完善个人信息后才能查看我的发布哦',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: 'myPush/myPush',
      })
    }
  },

  toMyComment: function (event) {
    //console.log(event)
    var userDetailInfo = event.currentTarget.dataset.set
    var userInfo = event.currentTarget.id
    //console.log(userInfo)
    if (userInfo == '' || userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 2000
      });
    } else if (userDetailInfo == null) {
      wx.showToast({
        title: '完善个人信息后才能查看我的评论哦',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: 'myComment/myComment',
      })
    }
  },

  toLike: function (event) {
    var userInfo = event.currentTarget.id
    if (userInfo == '' || userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: 'like/like',
      })
    }
  },

  toLog: function () {
    wx.navigateTo({
      url: 'log/log',
    })
  },

  toAbout: function () {
    wx.navigateTo({
      url: 'about/about',
    })
  },

  toPraise: function () {
    wx.navigateTo({
      url: 'praise/praise',
    })
  },

  toContact: function () {
    wx.navigateTo({
      url: 'contact/contact',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      userDetailInfo: app.globalData.userDetailInfo,
      status: app.globalData.status,
      count: app.globalData.count
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.setData({
      userDetailInfo: app.globalData.userDetailInfo
    })
    //获取未读评论总数
    wx.request({
      url: app.globalData.host + '/discuss/getUnReadCount',
      data: {
        "openId": app.globalData.openId
      },
      method: 'GET',
      success(res) {
        //console.log(res.data.count)
        app.globalData.count = res.data.count
        that.setData({
          count: res.data.count
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})