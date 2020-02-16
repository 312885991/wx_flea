// pages/mine/myPush/myPush.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      pushGoods:[],
      examineGoods:[],
      noPassGoods:[],
      unPushGoods:[],
      active:0
  },

  under:function(event){
    //console.log(event.currentTarget.id)
    var that =this
    wx.showModal({
      title: '提示',
      content: '确认下架吗？',
      success: function (res) {
        if(res.confirm){
          wx.request({
            url: app.globalData.host + '/good/updateGoodStatus',
            data: {
              "id": event.currentTarget.id,
              "status": 1
            },
            method: 'PUT',
            header: {
              'Content-Type': 'application/json',
            },
            success(res) {
              //console.log(res)
              wx.showToast({
                title: '下架成功',
                icon: 'success',
                duration: 2000
              });
              //重新查询上架商品
              wx.request({
                url: app.globalData.host + '/good/list',
                data: {
                  "examine": 1, //已审核
                  "status": 0, //未下架
                  "openId": app.globalData.openId
                },
                method: 'POST', 
                header: {
                  'Content-Type': 'application/json',
                },
                success(res) {
                  //console.log(res)
                  that.setData({
                    pushGoods: res.data.data
                  })
                  //console.log(that.data.pushGoods)
                }
              })
            }
          })
        }
      }
    })
    
  },

  confirm:function(event){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认交易成功吗？',
      success: function (res) {
        if(res.confirm){
          wx.request({
            url: app.globalData.host + '/good/updateGoodStatus',
            data: {
              "id": event.currentTarget.id,
              "trade": 1 //已交易
            },
            method: 'PUT',
            header: {
              'Content-Type': 'application/json',
            },
            success(res) {
              //console.log(res)
              wx.showToast({
                title: '交易成功',
                icon: 'success',
                duration: 2000
              });
              //重新查询上架商品
              wx.request({
                url: app.globalData.host + '/good/list',
                data: {
                  "examine": 1, //已审核
                  "status": 0, //未下架
                  "openId": app.globalData.openId
                },
                method: 'POST',
                header: {
                  'Content-Type': 'application/json',
                },
                success(res) {
                  //console.log(res)
                  that.setData({
                    pushGoods: res.data.data
                  })
                  //console.log(that.data.pushGoods)
                }
              })
            }
          })
        }
      }
    })
  },


  delete: function (event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success: function (res) {
        if(res.confirm){
          wx.request({
            url: app.globalData.host + '/good/deleteGoodById?id=' + event.currentTarget.id,
            method: 'DELETE',
            success(res) {
              //console.log(res)
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              });
              //重新查询未通过商品
              wx.request({
                url: app.globalData.host + '/good/list',
                data: {
                  "examine": 2,
                  "openId": app.globalData.openId
                },
                method: 'POST',
                header: {
                  'Content-Type': 'application/json',
                },
                success(res) {
                  //console.log(res)
                  that.setData({
                    noPassGoods: res.data.data
                  })
                  //console.log(that.data.noPassGoods)
                }
              })
            }
          })
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
        if(res.confirm){
          wx.request({
            url: app.globalData.host + '/good/deleteGoodById?id=' + event.currentTarget.id,
            method: 'DELETE',
            success(res) {
              //console.log(res)
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 2500
              });
              //重新查询待审核商品
              wx.request({
                url: app.globalData.host + '/good/list',
                data: {
                  "examine": 0,
                  "openId": app.globalData.openId
                },
                method: 'POST',
                header: {
                  'Content-Type': 'application/json',
                },
                success(res) {
                  //console.log(res)
                  that.setData({
                    examineGoods: res.data.data
                  })
                  //console.log(that.data.pushGoods)
                }
              })
            }
          })
        }
      }
    })
  },



  info: function (event) {
    wx.navigateTo({
      url: '/pages/goods/goodInfo/goodInfo?id=' + event.currentTarget.id,
    })
  },

  change:function(event){
    // console.log(event.detail.index)
    var that = this
    if(event.detail.index == 0){
      if (that.data.pushGoods.length == 0){
        wx.showLoading({
          title: '加载中',
        })
      }
      wx.request({
        url: app.globalData.host + '/good/list',
        data: {
          "examine": 1,
          "status":0,
          "openId": app.globalData.openId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        success(res) {
          //console.log(res)
          setTimeout(function () {
            wx.hideLoading()
            that.setData({
              pushGoods: res.data.data
            })
          }, 500)
          //console.log(that.data.pushGoods)
        },
        fail:function(){
          wx.showToast({
            title: '服务器异常',
            icon:"none",
            duration:2000
          })
        }
      })
    } else if (event.detail.index == 1){
      if (that.data.examineGoods.length == 0) {
        wx.showLoading({
          title: '加载中',
        })
      }
      wx.request({
        url: app.globalData.host + '/good/list',
        data: {
          "examine": 0,
          "openId": app.globalData.openId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        success(res) {
          //console.log(res)
          setTimeout(function () {
            wx.hideLoading()
            that.setData({
              examineGoods: res.data.data
            })
          }, 500)
          
        },
        fail: function () {
          wx.showToast({
            title: '服务器异常',
            icon: "none",
            duration: 2000
          })
        }
      })
    } else if (event.detail.index == 2){
      if (that.data.noPassGoods.length == 0) {
        wx.showLoading({
          title: '加载中',
        })
      }
      wx.request({
        url: app.globalData.host + '/good/list',
        data: {
          "examine": 2,
          "openId": app.globalData.openId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        success(res) {
          //console.log(res)
          setTimeout(function () {
            wx.hideLoading()
            that.setData({
              noPassGoods: res.data.data
            })
          }, 500)
          
          //console.log(that.data.noPassGoods)
        },
        fail: function () {
          wx.showToast({
            title: '服务器异常',
            icon: "none",
            duration: 2000
          })
        }
      })
    } else if (event.detail.index == 3){
      if (that.data.unPushGoods.length == 0) {
        wx.showLoading({
          title: '加载中',
        })
      }
      wx.request({
        url: app.globalData.host + '/good/list',
        data: {
          "status": 1,
          "openId": app.globalData.openId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        success(res) {
          //console.log(res)
          setTimeout(function () {
            wx.hideLoading()
            that.setData({
              unPushGoods: res.data.data
            })
          }, 500)
          
          //console.log(that.data.unPushGoods)
        },
        fail: function () {
          wx.showToast({
            title: '服务器异常',
            icon: "none",
            duration: 2000
          })
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //发布完商品后跳转到该页面(则跳到里面的待审核页面)
    if(options.active){
      that.setData({
        // active: options.active
        active: 1 //待审核页面索引
      })
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.host + '/good/list',
        data: {
          "examine": 0,
          "openId": app.globalData.openId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        success(res) {
          //console.log(res)
          setTimeout(function () {
            wx.hideLoading()
            that.setData({
              examineGoods: res.data.data
            })
          }, 500)
        },
        fail: function () {
          wx.showToast({
            title: '服务器异常',
            icon: "none",
            duration: 2000
          })
        }
      })
    }
    //直接点开该页面
    else{
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.host + '/good/list',
        data: {
          "examine": 1,
          "status": 0,
          "openId": app.globalData.openId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        success(res) {
          //console.log(res)
          setTimeout(function(){
            wx.hideLoading()
            that.setData({
              pushGoods: res.data.data
            })
          },500)
          //console.log(that.data.pushGoods)
        },
        fail: function () {
          wx.showToast({
            title: '服务器异常',
            icon: "none",
            duration: 2000
          })
        }
      })
    }
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