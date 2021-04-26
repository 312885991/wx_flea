// pages/goods/goodInfo/goodInfo.js
import { fetch } from '../../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo: null,
    comments: [],
    goodId: null,
    openId: null,
    //是否收藏
    flag: false
  },

  requestSaveLike: function (goodId, openId) {
    var that = this;
    fetch({
      url: '/like/save',
      method: 'POST',
      data: {
        "goodId": goodId,
        "openId": openId
      },
      msg: '正在收藏'
    }).then((res) => {
      that.setData({
        flag: true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000
      });
    })
  },

  requestDeleteLike: function (goodId, openId) {
    var that = this;
    fetch({
      url: '/like/delete?goodId=' + goodId + '&openId=' + openId,
      method: 'DELETE',
      msg: '正在取消'
    }).then((res) => {
      that.setData({
        flag: false
      })
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 2000
      });
    })
  },

  //收藏
  like: function () {
    var that = this;
    let goodId = that.data.goodId;
    let openId = that.data.openId;
    let userInfo = wx.getStorageSync('userInfo') || null;
    if (userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 2000
      });
    } else {
      if (!that.data.flag) {
        //进行收藏
        that.requestSaveLike(goodId, openId);
      } else {
        this.requestDeleteLike(goodId, openId);
      }
    }
  },

  //预览商品图片
  previewImage: function (event) {
    wx.previewImage({
      urls: this.data.goodInfo.imageUrl.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
    })
  },

  previewDisscussImage: function (event) {
    //console.log(event.currentTarget.dataset.set)
    wx.previewImage({
      urls: event.currentTarget.dataset.set.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
    })
  },


  comment: function (event) {
    //console.log(event.currentTarget.id)
    let userInfo = wx.getStorageSync('userInfo') || null;
    let userDetailInfo = wx.getStorageSync('userDetailInfo') || null;
    // console.log(userDeatilInfo)
    //console.log(userInfo)
    if (userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 3000
      });
    } else {
      if (userDetailInfo == null) {
        wx.showToast({
          title: '请先完善用户信息',
          icon: 'none',
          duration: 3000
        });
      } else {
        wx.navigateTo({
          url: '../comment/comment?goodId=' + event.currentTarget.id
        })
      }
    }
  },

  requestDeleteComment: function (id, goodId) {
    console.log(id)
    fetch({
      url: '/discuss/delete?id=' + id,
      method: 'DELETE'
    }).then(() => {
      this.requestGoodInfo(goodId)
      this.requestDiscussList(goodId)
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 1500
      })
    }).catch(()=>{
      wx.showToast({
        title: '删除失败',
        icon: 'none',
        duration: 1500
      })
    })
  },

  deleteComment: function (event) {
    var that = this
    //评论ID
    //console.log(event.currentTarget.id)
    //商品ID
    //console.log(event.currentTarget.dataset.set)
    wx.showModal({
      title: '提示',
      content: '确认删除该评论吗？',
      success: function (res) {
        if (res.confirm) {
          //删除评论
          that.requestDeleteComment(event.currentTarget.id, event.currentTarget.dataset.set);
        } else {//这里是点击了取消以后
          //console.log('用户点击取消')
        }
      }
    })
  },

  contact: function () {
    let that = this
    wx.showActionSheet({
      itemList: ['QQ', '微信', '手机号'],
      success(res) {
        //QQ
        if (res.tapIndex == 0) {
          if (that.data.goodInfo.qq == null
            || that.data.goodInfo.qq == '' || that.data.goodInfo.qq == 'null') {
            wx.showToast({
              title: '卖家暂未设置QQ号',
              icon: 'none',
              duration: 2500
            })
          } else {
            wx.setClipboardData({
              data: that.data.goodInfo.qq,
              success(res) {
                wx.getClipboardData({
                })
              }
            })
          }
        }
        //微信
        if (res.tapIndex == 1) {
          if (that.data.goodInfo.wechat == null
            || that.data.goodInfo.wechat == '' || that.data.goodInfo.wechat == 'null') {
            wx.showToast({
              title: '卖家暂未设置微信号',
              icon: 'none',
              duration: 2500
            })
          } else {
            wx.setClipboardData({
              data: that.data.goodInfo.wechat,
              success(res) {
                wx.getClipboardData({
                })
              }
            })
          }
        }
        //手机号
        if (res.tapIndex == 2) {
          if (that.data.goodInfo.phone == null
            || that.data.goodInfo.phone == '' || that.data.goodInfo.phone == 'null') {
            wx.showToast({
              title: '卖家暂未设置手机号',
              icon: 'none',
              duration: 2500
            })
          } else {
            wx.makePhoneCall({
              phoneNumber: that.data.goodInfo.phone
            })
          }
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
    // wx.makePhoneCall({
    //   phoneNumber: this.data.goodInfo.phone
    // })
  },

  requestGoodInfo: function (id) {
    var that = this;
    fetch({
      url: '/good/info',
      method: 'GET',
      data: {
        "id": id
      }
    }).then((res) => {
      that.setData({
        goodInfo: res.data.data
      })
    })
  },

  requestDiscussList: function (id) {
    var that = this;
    fetch({
      url: '/discuss/list',
      data: {
        "goodId": id
      },
      method: 'GET'
    }).then((res) => {
      that.setData({
        comments: res.data.data
      })
    })
  },

  requestIsLike: function (goodId, openId) {
    var that = this;
    fetch({
      url: '/like/list',
      method: 'GET',
      data: {
        "goodId": goodId,
        "openId": openId
      }
    }).then((res) => {
      if (res.data.data.length != 0) {
        that.setData({
          flag: true
        })
      }
    })
  },

  onLoad: function (options) {
    let goodId = options.id;
    let openId = wx.getStorageSync('openId') || null;
    this.setData({
      goodId: goodId,
      openId: openId
    })
    this.requestGoodInfo(goodId);
    this.requestDiscussList(goodId);
    this.requestIsLike(goodId, openId)
  },

  all: function () {
    wx.switchTab({
      url: '/pages/goods/goods',
    })
  },

  user: function () {
    wx.navigateTo({
      url: '/pages/mine/userInfo/userInfo',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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