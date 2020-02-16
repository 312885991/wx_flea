// pages/main/main.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    announceList:[]
  }, 

  more:function(){
    wx.navigateTo({
      url: '/pages/main/announceList/announceList',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.host + '/getOSSImageUrl',
      success(res) {
        that.setData({
          imgUrls: res.data.imageUrl
        })
      }
    })
    wx.request({
      url: app.globalData.host + '/announce/page?page=0&pageSize=5',
      success(res) {
        that.setData({
          announceList: res.data.data.list
        })
        // console.log(res.data.data)
      }
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