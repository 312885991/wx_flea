// pages/mine/edit/edit.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    phone: null,
    school: null,
    wechat: null,
    qq: null,
    address: null,
    userDetailInfo: null,
  },

  name: function(event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      name: event.detail.value
    })
  },
  phone: function(event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      phone: event.detail.value
    })
  },
  school: function(event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      school: event.detail.value
    })
  },
  wechat: function(event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      wechat: event.detail.value
    })
  },
  qq: function(event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      qq: event.detail.value
    })
  },

  address:function(event){
    var that = this
    //console.log(event.detail)
    that.setData({
      address: event.detail.value
    })
  },

  add: function() {
    var that = this
    //console.log(this.data.name)
    if (that.data.name == null || that.data.name.trim() == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      });
    }else{
      if (that.data.phone == null || that.data.phone.trim() == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 2000
        });
      }else{
        if (that.data.school == null || that.data.school.trim() == '') {
          wx.showToast({
            title: '学校不能为空',
            icon: 'none',
            duration: 2000
          });
        
        }else{
          if (that.data.wechat == null || that.data.wechat.trim() == '') {
            wx.showToast({
              title: '微信号不能为空',
              icon: 'none',
              duration: 2000
            });
          
          }else{
            if (that.data.qq == null || that.data.qq.trim() == '') {
              wx.showToast({
                title: 'QQ号不能为空',
                icon: 'none',
                duration: 2000
              });
            }else{
              //未输入地址
              if (that.data.address == null){
                wx.request({
                  url: app.globalData.host + '/user/save',
                  data: {
                    "openId": app.globalData.openId,
                    "name": that.data.name,
                    "school": that.data.school,
                    "wechat": that.data.wechat,
                    "qq": that.data.qq,
                    "phone": that.data.phone,
                    "sex": app.globalData.userInfo.gender,
                    "nickName": app.globalData.userInfo.nickName,
                    "avatarUrl": app.globalData.userInfo.avatarUrl
                  },
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json',
                  },
                  success(res) {
                    //console.log(res)
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 2000
                    });
                    app.globalData.userDetailInfo = res.data.data
                    setTimeout(function () {
                      wx.switchTab({
                        url: '/pages/mine/mine',
                      })
                    }, 2000)
                  },
                  fail(error) {
                    //console.log(error)
                    wx.showToast({
                      title: '服务器异常',
                      icon: 'loading',
                      duration: 2000
                    });
                  }
                });
              }else{
                wx.request({
                  url: app.globalData.host + '/user/save',
                  data: {
                    "openId": app.globalData.openId,
                    "name": that.data.name,
                    "school": that.data.school,
                    "wechat": that.data.wechat,
                    "qq": that.data.qq,
                    "address": that.data.address,
                    "phone": that.data.phone,
                    "sex": app.globalData.userInfo.gender,
                    "nickName": app.globalData.userInfo.nickName,
                    "avatarUrl": app.globalData.userInfo.avatarUrl
                  },
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json',
                  },
                  success(res) {
                    //console.log(res)
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 2000
                    });
                    // 将修改返回的新数据重新赋值到全局变量userDetailInfo中
                    app.globalData.userDetailInfo = res.data.data
                    setTimeout(function () {
                      wx.switchTab({
                        url: '/pages/mine/mine',
                      })
                    }, 2000)
                  },
                  fail(error) {
                    //console.log(error)
                    wx.showToast({
                      title: '服务器异常',
                      icon: 'loading',
                      duration: 2000
                    });
                  }
                });
              }
            }
          }
        }
      }
    }
  },

  update: function () {
    var that = this
    //console.log(this.data.name)
    wx.request({
      url: app.globalData.host + '/user/update',
      data: {
        "openId": app.globalData.openId,
        "name": this.data.name,
        "school": this.data.school,
        "wechat": this.data.wechat,
        "qq": this.data.qq,
        "address": this.data.address,
        "phone": this.data.phone,
        "nickName": app.globalData.userInfo.nickName,
        "avatarUrl": app.globalData.userInfo.avatarUrl
      },
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
      },
      success(res) {
        //console.log(res)
        // 将修改返回的新数据重新赋值到全局变量userDetailInfo中
        app.globalData.userDetailInfo = res.data.data
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        }, 2000)
      },
      fail(error) {
        wx.showToast({
          title: '服务器异常',
          icon: 'error',
          duration: 2000
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    that.setData({
      userDetailInfo: app.globalData.userDetailInfo
    })
    //获取用户详情
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {
  wx.setNavigationBarTitle({
    title: '个人信息',
  })
},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {
  var that = this
  wx.request({
    url: app.globalData.host + '/user/getUserByOpenId',
    data: {
      openId: app.globalData.openId
    },
    method: 'GET',
    success(res) {
      that.setData({
        userDetailInfo: res.data.data
      })
      app.globalData.userDetailInfo = res.data.data
    }
  })
},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})