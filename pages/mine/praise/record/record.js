// pages/mine/praise/record/record.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function(){
      wx.request({
        url: app.globalData.host + '/record/list',
        method: 'GET',
        success(res) {
          //console.log(res.data.data)
          if (res.data.data) {
            wx.hideLoading()
            that.setData({
              records: res.data.data.reverse()
            })
          } else {
            wx.showToast({
              title: '加载失败',
              icon: "none",
              duration: 2500
            })
          }
        },
        fail(error) {
          wx.showToast({
            title: '服务器异常',
            icon: "none",
            duration: 2500
          })
        }
      })
    },300)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '赞赏记录',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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