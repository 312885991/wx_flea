// pages/mine/myComment/myComment.js
import { fetch } from '../../../utils/request'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myComment: [],
    commentMe: []
  },

  onClick: function (event) {
    // console.log(event.detail.index)
    var that = this
    if (event.detail.index == 0) {
      //获取我评论的
      that.requestMyDiscuss();
    } else {
      //获取评论我的
      that.requestDiscussMe();
    }
  },

  detail: function (event) {
    //console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '/pages/goods/goodInfo/goodInfo?id=' + event.currentTarget.id
    })
  },

  //获取我的评论
  requestMyDiscuss: function () {
    var that = this
    fetch({
      url: '/discuss/list',
      method: 'GET',
      data: {
        "openId": that.data.openId
      },
    }).then((res) => {
      // console.log(res.data.data)
      that.setData({
        myComment: res.data.data.reverse()
      })
    })
  },

  //获取评论我的
  requestDiscussMe: function () {
    var that = this
    fetch({
      url: '/discuss/getDiscussListByOpenId',
      method: 'GET',
      data: {
        "openId": that.data.openId
      },
    }).then((res) => {
      // console.log(res.data.data)
      that.setData({
        commentMe: res.data.data.reverse()
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
    //获取我评论的
    that.requestMyDiscuss();
    //获取评论我的
    that.requestDiscussMe();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的评论',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    //获取我评论的
    that.requestMyDiscuss();
    //获取评论我的
    that.requestDiscussMe();
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