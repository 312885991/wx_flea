// pages/goods/goodInfo/goodInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo:null,
    comments:[],
    goodId:null,
    openId:null,
    status:false,
    //是否收藏
    flag:false
  },

  //收藏
  like: function () {
    var that = this
    if(app.globalData.userInfo == null){
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 2000
      });
    }else{
      if (!that.data.flag) {
        //进行收藏
        wx.request({
          url: app.globalData.host + '/like/save',
          data: {
            "goodId": that.data.goodId,
            "openId": app.globalData.openId
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
          },
          success(res) {
            //console.log(res.data)
            //添加成功
            if(res.data){
              that.setData({
                flag: !that.data.flag
              })
              wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 2000
              });
            }else{
              wx.showToast({
                title: '收藏失败',
                icon: 'none',
                duration: 2000
              });
            }
          },
          fail(error) {
            //console.log(error)
            wx.showToast({
              title: '收藏失败,请稍后再试',
              icon: 'none',
              duration: 2000
            });
          }
        })
      }else {
        //取消收藏
        wx.request({
          url: app.globalData.host + '/like/delete?goodId=' + that.data.goodId + '&openId=' + app.globalData.openId ,
          method: 'DELETE',
          success(res) {
            //取消成功
            that.setData({
              flag: !that.data.flag
            })
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
              duration: 2000
            });
          },
          fail(error) {
            //console.log(error)
            wx.showToast({
              title: '取消失败,请稍后再试',
              icon: 'none',
              duration: 2000
            });
          }
        })
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

  previewDisscussImage:function(event){
    //console.log(event.currentTarget.dataset.set)
    wx.previewImage({
      urls: event.currentTarget.dataset.set.split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错
    })
  },


  comment:function(event){
    //console.log(event.currentTarget.id)
    var userInfo = app.globalData.userInfo
    let userDeatilInfo = app.globalData.userDetailInfo
    console.log(userDeatilInfo)
    //console.log(userInfo)
    if (userInfo == '' || userInfo == null) {
      wx.showToast({
        title: '请先进行用户授权',
        icon: 'none',
        duration: 3000
      });
    }else{
      if (userDeatilInfo == '' || userDeatilInfo == null){
        wx.showToast({
          title: '请先完善用户信息',
          icon: 'none',
          duration: 3000
        });
      }else{
        wx.navigateTo({
          url: '../comment/comment?goodId=' + event.currentTarget.id
        })
      }
    }
  },

  deleteComment:function(event){
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
          wx.request({
            url: app.globalData.host + '/discuss/delete?id=' + event.currentTarget.id,
            method: 'DELETE',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            success(res) {
              // 更新评论数
              wx.request({
                url: app.globalData.host + '/good/updateComment/delete',
                data: event.currentTarget.dataset.set,
                method: 'PUT',
                header: {
                  'Content-Type': 'application/json',
                },
                success(res) {
                  //重新查询商品信息
                  wx.request({
                    url: app.globalData.host + '/good/info',
                    data: {
                      "id": event.currentTarget.dataset.set
                    },
                    method: 'GET',
                    success(res) {
                      //console.log(res.data.data)
                      that.setData({
                        goodInfo: res.data.data
                      })
                    }
                  })
                }
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              });
              //重新查询评论
              wx.request({
                url: app.globalData.host + '/discuss/list',
                data: {
                  "goodId": event.currentTarget.dataset.set
                },
                method: 'GET',
                success(res) {
                  //console.log(res.data.data)
                  that.setData({
                    comments: res.data.data
                  })
                }
              })
              
            }
          })
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
        if (res.tapIndex == 0){
          if (that.data.goodInfo.qq == null 
          || that.data.goodInfo.qq == '' || that.data.goodInfo.qq == 'null'){
            wx.showToast({
              title: '卖家暂未设置QQ号',
              icon: 'none',
              duration: 2500
            })
          }else{
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

  onLoad: function (options) {
    var that = this
    that.setData({
      openId: app.globalData.openId,
      status: app.globalData.status,
      goodId: options.id
    })
    //console.log(options.id)
    wx.request({
      url: app.globalData.host + '/good/info',
      data: {
        "id": options.id
      },
      method: 'GET',
      success(res) {
        // console.log(res.data.data)
        that.setData({
          goodInfo: res.data.data
        })
      }
    })
    wx.request({
      url: app.globalData.host + '/discuss/list',
      data: {
        "goodId": options.id
      },
      method: 'GET',
      success(res) {
        // console.log(res.data.data)
        that.setData({
          comments: res.data.data
        })
      }
    })
    wx.request({
      url: app.globalData.host + '/like/list',
      data: {
        "goodId": options.id,
        "openId": app.globalData.openId
      },
      method: 'GET',
      success(res) {
        //console.log(res.data.data)
        //说明已经收藏过
        if(res.data.data.length != 0){
          that.setData({
            flag : true
          })
        }
      }
    })
  },

  all:function(){
    wx.switchTab({
      url: '/pages/goods/goods',
    })
  },

  user:function(){
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
    // wx.switchTab({
    //   url: '/pages/goods/goods',
    // })
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