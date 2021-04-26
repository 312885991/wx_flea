// pages/goods/comment/comment.js
import { fetch, uploadFile } from '../../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodId: null,
    openId: null,
    comment: null,
    flag: true,
    file: null,
    filePath: null,
    length: "0"
  },

  bindchange: function (event) {
    var that = this
    //console.log(event.detail.value)
    //设置是否匿名
    that.setData({
      flag: event.detail.value
    })
  },

  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          file: res.tempFilePaths,
          filePath: res.tempFilePaths[0]
        });
      }
    })
  },

  comment: function (event) {
    //console.log(event)
    var that = this
    that.setData({
      length: event.detail.cursor,
      comment: event.detail.value
    })
  },

  requestSaveComment: function () {
    var that = this;
    fetch({
      url: '/discuss/save',
      method: 'POST',
      data: {
        "openId": that.data.openId,
        "goodId": that.data.goodId,
        "comment": that.data.comment,
        "flag": that.data.flag,
      },
      msg: '正在发表'
    }).then((res) => {
      wx.showToast({
        title: '发表成功'
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '/pages/goods/goodInfo/goodInfo?id=' + that.data.goodId,
        })
      }, 2000)
    })
  },

  requestSaveCommentWithFile: function () {
    var that = this;
    uploadFile({
      filePath: that.data.filePath,
      name: 'file',
      msg: '上传图片中'
    }).then((res) => {
      var imageUrl = JSON.parse(res.data).imageUrl
      fetch({
        url: '/discuss/save',
        method: 'POST',
        data: {
          "openId": that.data.openId,
          "goodId": that.data.goodId,
          "comment": that.data.comment,
          "flag": that.data.flag,
          "imageUrl": imageUrl
        },
        msg: '正在发表'
      }).then((res) => {
        wx.showToast({
          title: '发表成功'
        })
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/goods/goodInfo/goodInfo?id=' + that.data.goodId
          })
        }, 2000)
      })
    })

  },

  submit: function () {
    var that = this
    //校验输入的数据
    if (that.data.comment == null || that.data.comment.trim() == '') {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none',
        duration: 2000
      });
    } else {
      //不上传图片
      if (that.data.filePath == null) {
        that.requestSaveComment();
      } else {
        //上传图片
        that.requestSaveCommentWithFile();
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      goodId: options.goodId,
      openId: wx.getStorageSync('openId') || null
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '评论',
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