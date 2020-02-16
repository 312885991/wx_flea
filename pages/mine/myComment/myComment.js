// pages/mine/myComment/myComment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myComment:[],
    commentMe:[],
    count:0
  },

  onClick:function(event){
    // console.log(event.detail.index)
    var that = this
    if (event.detail.index == 1){
      if(that.data.count != 0){
        wx.request({
          url: app.globalData.host + '/discuss/updateToRead',
          data: app.globalData.openId,
          method: 'PUT',
          header: {
            'Content-Type': 'application/json',
          },
          success(res) {
            //console.log(res.data)
            app.globalData.count = 0
            that.setData({
              count: 0
            })
          }
        })
      }
    }
  },

  detail:function(event){
    //console.log(event.currentTarget.id)
    wx.request({
      url: app.globalData.host + '/good/updateBrowse',
      data: event.currentTarget.id,
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
      },
      success(res) {
        //console.log(res)
      }
    })
    wx.navigateTo({
      url: '/pages/goods/goodInfo/goodInfo?id=' + event.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      count: app.globalData.count
    })
    //获取我评论的
    wx.request({
      url: app.globalData.host + '/discuss/list',
      data: {
        "openId": app.globalData.openId
      },
      method: 'GET',
      success(res) {
        console.log(res.data)
        that.setData({
          myComment: res.data.data.reverse()
        })
      }
    })
    //获取评论我的
    wx.request({
      url: app.globalData.host + '/discuss/getDiscussListByOpenId',
      data: {
        "openId": app.globalData.openId
      },
      method: 'GET',
      success(res) {
        //console.log(res.data)
        that.setData({
          commentMe: res.data.data.reverse()
        })
      }
    })
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
    wx.request({
      url: app.globalData.host + '/discuss/list',
      data: {
        "openId": app.globalData.openId
      },
      method: 'GET',
      success(res) {
        //console.log(res.data)
        that.setData({
          myComment: res.data.data.reverse()
        })
      }
    })
    wx.request({
      url: app.globalData.host + '/discuss/getDiscussListByOpenId',
      data: {
        "openId": app.globalData.openId
      },
      method: 'GET',
      success(res) {
        //console.log(res.data)
        that.setData({
          commentMe: res.data.data.reverse()
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