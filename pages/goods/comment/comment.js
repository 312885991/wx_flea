// pages/goods/comment/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodId:null,
    comment:null,
    flag:true,
    file:null,
    filePath: null,
    length:"0"
  },
  bindchange:function(event){
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
      comment:event.detail.value
    })
  },
  submit: function () {
    var that = this
    //校验输入的数据
    if (that.data.comment == null || that.data.comment.trim() == ''){
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none',
        duration: 2000
      });
    }else{
      wx.showLoading({
        title: '正在发表',
      })
      setTimeout(function () {
        //不上传图片
        if (that.data.filePath == null) {
          wx.request({
            url: app.globalData.host + '/discuss/save',
            data: {
              "openId": app.globalData.openId,
              "goodId": that.data.goodId,
              "comment": that.data.comment,
              "flag": that.data.flag
            },
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
            },
            success(res) {
              //console.log(res)
              //更新商品评论数
              wx.request({
                url: app.globalData.host + '/good/updateComment/add',
                data: that.data.goodId,
                method: 'PUT',
                header: {
                  'Content-Type': 'application/json',
                },
                success(res) {
                  //console.log(res)
                }
              })
              wx.showToast({
                title: '发表成功',
                icon: 'success',
                duration: 2000
              });
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/goods/goodInfo/goodInfo?id=' + that.data.goodId,
                })
              }, 2000)
            },
            fail: function (error) {
              wx.showToast({
                title: '发表失败',
                icon: 'none',
                duration: 2000
              });
            }
          })
        } else {
          //上传图片
          wx.uploadFile({
            url: app.globalData.host + '/good/uploadOSSImage',
            filePath: that.data.filePath,
            name: "file",
            //上传成功
            success: function (res) {
              //console.log(res.data)
              var imageUrl = JSON.parse(res.data).imageUrl
              //成功返回上传后的图片URL地址
                wx.request({
                  url: app.globalData.host + '/discuss/save',
                  data: {
                    "openId": app.globalData.openId,
                    "goodId": that.data.goodId,
                    "comment": that.data.comment,
                    "flag": that.data.flag,
                    "imageUrl": imageUrl
                  },
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json',
                  },
                  success(res) {
                    //console.log(res)
                    //更新商品评论数
                    wx.request({
                      url: app.globalData.host + '/good/updateComment/add',
                      data: that.data.goodId,
                      method: 'PUT',
                      header: {
                        'Content-Type': 'application/json',
                      },
                      success(res) {
                        //console.log(res)
                      }
                    })
                    wx.showToast({
                      title: '发表成功',
                      icon: 'success',
                      duration: 2500
                    });
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '/pages/goods/goodInfo/goodInfo?id=' + that.data.goodId,
                      })
                    }, 2000)
                  },
                  fail: function (error) {
                    wx.showToast({
                      title: '服务器异常',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                })
            },
            fail:function(){
              wx.showToast({
                title: '图片上传失败',
                icon: 'none',
                duration: 2000
              });
            }
          })
        }
      },400)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      goodId: options.goodId
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