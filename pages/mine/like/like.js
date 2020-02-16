// pages/mine/like/like.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[]
  },

  info:function(event){
    wx.navigateTo({
      url: '/pages/goods/goodInfo/goodInfo?id=' + event.currentTarget.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.host + '/like/getGoodsByOpenId',
      data:{
        "openId": app.globalData.openId
      },
      method: 'GET',
      success(res) {
        //console.log(res.data.data)
        setTimeout(function(){
          wx.hideLoading()
          that.setData({
            goodList: res.data.data.reverse()
          })
        },400)
        
      },
      fail:function(){
        wx.showToast({
          title: '服务器异常',
          icon:"none",
          duration:2500
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的收藏',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: app.globalData.host + '/like/getGoodsByOpenId',
      data: {
        "openId": app.globalData.openId
      },
      method: 'GET',
      success(res) {
        // console.log(res.data.data)
        that.setData({
          goodList: res.data.data.reverse()
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