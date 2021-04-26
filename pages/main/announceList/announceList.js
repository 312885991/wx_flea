// pages/main/announceList/announceList.js
import { fetch } from '../../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    announceList: []
  },

  info: function (event) {
    // console.log(event.target.id)
    wx.navigateTo({
      url: '/pages/main/announce/announce?id=' + event.target.id,
    })
  },

  requestAnnounceList: function () {
    var that = this;
    fetch({
      method: 'GET',
      url: '/announce/list'
    }).then((res) => {
      that.setData({
        announceList: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestAnnounceList();
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
    wx.setNavigationBarTitle({
      title: '公告列表',
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