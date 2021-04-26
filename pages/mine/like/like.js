// pages/mine/like/like.js
import { fetch } from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: null,
    goodList: []
  },

  info: function (event) {
    wx.navigateTo({
      url: '/pages/goods/goodInfo/goodInfo?id=' + event.currentTarget.id,
    })
  },

  requestLikeGoods: function () {
    var that = this;
    fetch({
      url: '/like/getGoodsByOpenId',
      method: 'GET',
      data: {
        "openId": that.data.openId
      }
    }).then((res) => {
      that.setData({
        goodList: res.data.data.reverse()
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      openId: wx.getStorageSync('openId') || null
    })
    that.requestLikeGoods();
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
    that.requestLikeGoods();
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