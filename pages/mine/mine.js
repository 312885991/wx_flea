// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userDetailInfo: null
  },

  showUserInfo: function () {
    wx.navigateTo({
      url: '/pages/mine/userInfo/userInfo'
    })
  },

  getUserProfile(e){
    var that = this;
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        // console.log(res)
        that.setData({
          userInfo: res.userInfo
        })
        // 存储用户信息
        wx.setStorageSync('userInfo', res.userInfo);
      }
    })
  },

  toEdit: function (event) {
    //console.log(event)
    var userInfo = this.data.userInfo;
    // console.log(userInfo)
    if (userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: '/pages/mine/edit/edit'
      })
    }
  },

  toPublication: function (event) {
    //console.log(event.currentTarget.dataset.set)
    var userDetailInfo = this.data.userDetailInfo
    var userInfo = this.data.userInfo
    console.log(userInfo)
    if (userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 3000
      });
    } else if (userDetailInfo == null) {
      wx.showToast({
        title: '请先完善个人信息',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: '/pages/mine/publication/publication',
      })
    }
  },

  toMyPush: function (event) {
    var userDetailInfo = this.data.userDetailInfo
    var userInfo = this.data.userInfo
    //console.log(userInfo)
    if (userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 2000
      });
    } else if (userDetailInfo == null) {
      wx.showToast({
        title: '请先完善个人信息',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: '/pages/mine/myPush/myPush',
      })
    }
  },

  toMyComment: function (event) {
    //console.log(event)
    var userDetailInfo = this.data.userDetailInfo
    var userInfo = this.data.userInfo
    console.log(userInfo)
    if (userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 2000
      });
    } else if (userDetailInfo == null) {
      wx.showToast({
        title: '请先完善个人信息',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: '/pages/mine/myComment/myComment',
      })
    }
  },

  toLike: function (event) {
    var userInfo = this.data.userInfo
    if (userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '/pages/mine/like/like',
      })
    }
  },

  toLog: function () {
    wx.navigateTo({
      url: '/pages/mine/log/log',
    })
  },

  toAbout: function () {
    wx.navigateTo({
      url: '/pages/mine/about/about',
    })
  },

  toPraise: function () {
    wx.navigateTo({
      url: '/pages/mine/praise/praise',
    })
  },

  toContact: function () {
    wx.navigateTo({
      url: '/pages/mine/contact/contact',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: wx.getStorageSync('userInfo') || null,
      userDetailInfo: wx.getStorageSync('userDetailInfo') || null
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
      userDetailInfo: wx.getStorageSync('userDetailInfo') || null,
      userInfo: wx.getStorageSync('userInfo') || null
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