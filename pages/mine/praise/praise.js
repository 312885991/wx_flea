// pages/mine/praise/praise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:"https://quicklyweb.cn/upload/praise.jpg"
  },

  previewImage: function (e) {
    // console.log(e)
      wx.previewImage({
        urls: this.data.imageUrl.split(',')
        // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
      })
  },

  getRecord:function(){
    wx.navigateTo({
      url: 'record/record',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '赞赏',
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