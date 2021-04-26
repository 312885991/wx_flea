// pages/mine/publication/publication.js
import { fetch, uploadFile } from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: null,
    // array: ['电脑数码', '家用电器', '运动户外', '服饰鞋包', '日用百货', '食品生鲜', '图书音像', '办公设备', '游戏物品'],
    array: [],
    name: null,
    sort: null,
    index: null,
    file: null,
    oldPrice: null,
    price: null,
    description: null,
    filePath: "",
    length: 0
  },

  bindSortChange: function (event) {
    var that = this
    // console.log(event.detail.value)
    that.setData({
      index: event.detail.value,
      sort: that.data.array[event.detail.value].id
    })
    // console.log(that.data.sort)
  },

  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          file: res.tempFilePaths,
          filePath: res.tempFilePaths[0]
        })
      }
    })
  },

  name: function (event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      name: event.detail.value
    })
  },

  oldPrice: function (event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      oldPrice: event.detail.value
    })
  },

  price: function (event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      price: event.detail.value
    })
  },

  description: function (event) {
    //console.log(event)
    var that = this
    that.setData({
      length: event.detail.cursor,
      description: event.detail.value
    })
  },

  requestPublish: function () {
    var that = this;
    uploadFile({
      filePath: that.data.filePath,
      name: 'file',
      msg: '上传图片中'
    }).then((res) => {
      var imageUrl = JSON.parse(res.data).imageUrl
      fetch({
        url: '/good/save',
        method: 'POST',
        data: {
          "openId": that.data.openId,
          "name": that.data.name,
          "sort": that.data.sort,
          "oldPrice": that.data.oldPrice,
          "currentPrice": that.data.price,
          "imageUrl": imageUrl,
          "description": that.data.description
        },
        msg: '正在发布'
      }).then((res) => {
        console.log(res.data)
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2500
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/mine/myPush/myPush?active=1',
          })
        }, 2000)
      }).catch(()=>{
        wx.showToast({
          title: '发布失败,请稍后再试',
          icon: 'none',
          duration: 2500
        });
      })
    })
  },

  submit: function () {
    //console.log(this.data.filePath)
    var that = this
    if (that.data.name == null || that.data.name.trim() == '') {
      wx.showToast({
        title: '请填写商品名称',
        icon: 'none',
        duration: 2000
      });
    } else {
      if (that.data.sort == null) {
        wx.showToast({
          title: '请选择商品类别',
          icon: 'none',
          duration: 2000
        });
      } else {
        if (that.data.oldPrice == null || that.data.oldPrice.trim() == '') {
          wx.showToast({
            title: '请填写商品原价',
            icon: 'none',
            duration: 2000
          });
        } else {
          if (that.data.price == null || that.data.price.trim() == '') {
            wx.showToast({
              title: '请填写商品价格',
              icon: 'none',
              duration: 2000
            });
          } else {
            if (that.data.file == null) {
              wx.showToast({
                title: '请上传您的商品图片',
                icon: 'none',
                duration: 2000
              });
            } else {
              this.requestPublish();
            }
          }
        }
      }
    }
  },

  requestCategoryList: function () {
    var that = this;
    fetch({
      url: '/category/list',
      method: 'GET'
    }).then((res) => {
      that.setData({
        array: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      openId: wx.getStorageSync('openId') || null
    })
    this.requestCategoryList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '发布商品',
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