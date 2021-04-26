// pages/mine/myPush/myPush.js
import { fetch } from '../../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openId: null,
    pushGoods: [],
    examineGoods: [],
    noPassGoods: [],
    unPushGoods: [],
    active: 0
  },

  under: function (event) {
    //console.log(event.currentTarget.id)
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认下架吗？',
      success: function (res) {
        if (res.confirm) {
          that.requestUnPush(event.currentTarget.id);
        }
      }
    })

  },

  requestUnPush: function (id) {
    var that = this
    fetch({
      url: '/good/updateGoodStatus',
      method: 'PUT',
      msg: '正在下架',
      data: {
        "id": id,
        "status": 1
      },
    }).then((res) => {
      wx.showToast({
        title: '下架成功'
      })
      that.requestPushGoods();
    })
  },


  requestTrade: function (id) {
    var that = this
    fetch({
      url: '/good/updateGoodStatus',
      method: 'PUT',
      msg: '正在交易',
      data: {
        "id": id,
        "trade": 1 //已交易
      },
    }).then((res) => {
      wx.showToast({
        title: '交易成功'
      })
      that.requestPushGoods();
    })
  },

  confirm: function (event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认交易成功吗？',
      success: function (res) {
        if (res.confirm) {
          that.requestTrade(event.currentTarget.id);
        }
      }
    })
  },

  requestDeleteNoPassGood: function (id) {
    var that = this
    fetch({
      url: '/good/deleteGoodById?id=' + id,
      method: 'DELETE',
      msg: '正在删除'
    }).then((res) => {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      });
      that.requestNoPassGoods();
    })
  },

  requestCancelPublish: function (id) {
    var that = this;
    fetch({
      url: '/good/deleteGoodById?id=' + id,
      method: 'DELETE',
      msg: '正在取消'
    }).then((res) => {
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 2000
      });
      that.requestExamineGoods();
    })
  },


  delete: function (event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          that.requestDeleteNoPassGood(event.currentTarget.id)
        }
      }
    })

  },

  cancel: function (event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认取消发布吗？',
      success: function (res) {
        if (res.confirm) {
          that.requestCancelPublish(event.currentTarget.id);
        }
      }
    })
  },



  info: function (event) {
    wx.navigateTo({
      url: '/pages/goods/goodInfo/goodInfo?id=' + event.currentTarget.id,
    })
  },

  change: function (event) {
    var that = this;
    // console.log(event.detail)
    if (event.detail.index == 0) {
      that.requestPushGoods();
    } else if (event.detail.index == 1) {
      that.requestExamineGoods();
    } else if (event.detail.index == 2) {
      that.requestNoPassGoods();
    } else if (event.detail.index == 3) {
      that.requestUnderGoods();
    }
  },


  requestPushGoods: function () {
    var that = this;
    fetch({
      url: '/good/list',
      method: 'POST',
      data: {
        "examine": 1,
        "status": 0,
        "openId": that.data.openId
      }
    }).then((res) => {
      that.setData({
        pushGoods: res.data.data
      })
    })
  },

  requestExamineGoods: function () {
    var that = this;
    fetch({
      url: '/good/list',
      method: 'POST',
      data: {
        "examine": 0,
        "openId": that.data.openId
      }
    }).then((res) => {
      // console.log(res.data, that.data.openId)
      that.setData({
        examineGoods: res.data.data
      })
    })
  },

  requestNoPassGoods: function () {
    var that = this;
    fetch({
      url: '/good/list',
      method: 'POST',
      data: {
        "examine": 2,
        "openId": that.data.openId
      }
    }).then((res) => {
      that.setData({
        noPassGoods: res.data.data
      })
    })
  },

  requestUnderGoods: function () {
    var that = this;
    fetch({
      url: '/good/list',
      method: 'POST',
      data: {
        "examine": 1,
        "status": 1,
        "openId": that.data.openId
      }
    }).then((res) => {
      that.setData({
        unPushGoods: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //发布完商品后跳转到该页面(则跳到里面的待审核页面)
    // console.log(options.active)
    // if(options.active){
    //   that.setData({
    //     active:1 //待审核页面索引
    //   })
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   wx.request({
    //     url: app.globalData.host + '/good/list',
    //     data: {
    //       "examine": 0,
    //       "openId": app.globalData.openId
    //     },
    //     method: 'POST',
    //     header: {
    //       'Content-Type': 'application/json',
    //     },
    //     success(res) {
    //       //console.log(res)
    //       setTimeout(function () {
    //         wx.hideLoading()
    //         that.setData({
    //           examineGoods: res.data.data
    //         })
    //       }, 500)
    //     },
    //     fail: function () {
    //       wx.showToast({
    //         title: '服务器异常',
    //         icon: "none",
    //         duration: 2000
    //       })
    //     }
    //   })
    // }
    // //直接点开该页面
    // else{
    var openId = wx.getStorageSync('openId');
    that.setData({
      openId: openId
    })
    this.requestPushGoods();
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的发布',
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