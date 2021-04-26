// pages/mine/edit/edit.js
import { fetch } from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: null,
    userInfo: null,
    name: null,
    phone: null,
    school: null,
    wechat: null,
    qq: null,
    address: null,
    userDetailInfo: null,
  },

  name: function (event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      name: event.detail.value
    })
  },
  phone: function (event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      phone: event.detail.value
    })
  },
  school: function (event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      school: event.detail.value
    })
  },
  wechat: function (event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      wechat: event.detail.value
    })
  },
  qq: function (event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      qq: event.detail.value
    })
  },

  address: function (event) {
    var that = this
    //console.log(event.detail)
    that.setData({
      address: event.detail.value
    })
  },

  requestSaveUser: function () {
    var that = this;
    fetch({
      url: '/user/save',
      method: 'POST',
      data: {
        "openId": that.data.openId,
        "name": that.data.name,
        "school": that.data.school,
        "wechat": that.data.wechat,
        "qq": that.data.qq,
        "address": that.data.address,
        "phone": that.data.phone,
        "sex": that.data.userInfo.gender,
        "nickName": that.data.userInfo.nickName,
        "avatarUrl": that.data.userInfo.avatarUrl,
      },
    }).then((res) => {
      // console.log(res.data)
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      });
      // 个人信息添加成功后，把userDetailInfo的值set到缓存中
      wx.setStorageSync('userDetailInfo', res.data.data);
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/mine/mine',
        })
      }, 800)
    })
  },

  add: function () {
    var that = this
    //console.log(this.data.name)
    if (that.data.name == null || that.data.name.trim() == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      });
    } else {
      if (that.data.phone == null || that.data.phone.trim() == '') {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none',
          duration: 2000
        });
      } else {
        if (that.data.school == null || that.data.school.trim() == '') {
          wx.showToast({
            title: '学校不能为空',
            icon: 'none',
            duration: 2000
          });

        } else {
          if (that.data.wechat == null || that.data.wechat.trim() == '') {
            wx.showToast({
              title: '微信号不能为空',
              icon: 'none',
              duration: 2000
            });

          } else {
            if (that.data.qq == null || that.data.qq.trim() == '') {
              wx.showToast({
                title: 'QQ号不能为空',
                icon: 'none',
                duration: 2000
              });
            } else {
              //未输入地址
              if (that.data.address == null || that.data.address.trim() == '') {
                wx.showToast({
                  title: '地址不能为空',
                  icon: 'none',
                  duration: 2000
                });
              } else {
                that.requestSaveUser();
              }
            }
          }
        }
      }
    }
  },

  requestUpdateUser: function () {
    var that = this;
    fetch({
      url: '/user/update',
      method: 'PUT',
      data: {
        "openId": that.data.openId,
        "name": that.data.name,
        "school": that.data.school,
        "wechat": that.data.wechat,
        "qq": that.data.qq,
        "address": that.data.address,
        "phone": that.data.phone,
        "nickName": that.data.userInfo.nickName,
        "avatarUrl": that.data.userInfo.avatarUrl,
      },
    }).then((res) => {
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000
      });
      // 个人信息修改成功后，重新把修改后的值set到缓存中
      wx.setStorageSync('userDetailInfo', res.data.data);
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/mine/mine',
        })
      }, 800)
    })
  },

  update: function () {
    var that = this
    that.requestUpdateUser();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    that.setData({
      openId: wx.getStorageSync('openId') || null,
      userInfo: wx.getStorageSync('userInfo') || null,
      userDetailInfo: wx.getStorageSync('userDetailInfo') || null
    })
    console.log(that.data.userDetailInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '个人信息',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.setData({
      userDetailInfo: wx.getStorageSync('userDetailInfo') || null
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