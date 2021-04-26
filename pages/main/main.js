// pages/main/main.js
import { fetch } from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['http://image.quicklyweb.cn/2019-10-02_1569997963524.jpg'],
    announceList: []
  },

  more: function () {
    wx.navigateTo({
      url: '/pages/main/announceList/announceList',
    })
  },


  requestImageUrl: function () {
    var that = this
    fetch({
      method: 'GET',
      url: '/getOSSImageUrl'
    }).then((res) => {
      that.setData({
        imgUrls: res.data.imageUrl
      })
    })
  },

  requestAnnouncePage: function () {
    var that = this
    fetch({
      method: 'GET',
      url: '/announce/page?page=0&pageSize=5'
    }).then((res) => {
      that.setData({
        announceList: res.data.data.list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestImageUrl();
    this.requestAnnouncePage();
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