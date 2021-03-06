// pages/mine/contact/contact.js
import { fetch } from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactInfo: null
  },

  copyWechat: function () {
    var wechat = this.data.contactInfo.wechat
    wx.setClipboardData({
      data: wechat,
      success(res) {
        wx.getClipboardData({
        })
      }
    })
  },

  copyPhone: function () {
    var phone = this.data.contactInfo.phone
    wx.setClipboardData({
      data: phone,
      success(res) {
        wx.getClipboardData({
        })
      }
    })
  },

  copyQQ: function () {
    var qq = this.data.contactInfo.qq
    wx.setClipboardData({
      data: qq,
      success(res) {
        wx.getClipboardData({
        })
      }
    })
  },

  requestConcat: function () {
    var that = this;
    fetch({
      url: '/contact/get',
      method: 'GET'
    }).then((res) => {
      that.setData({
        contactInfo: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.requestConcat();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '联系客服',
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