// pages/mine/publication/publication.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // array: ['电脑数码', '家用电器', '运动户外', '服饰鞋包', '日用百货', '食品生鲜', '图书音像', '办公设备', '游戏物品'],
    array:[],
    name:null,
    sort:null,
    index:null,
    file:null,
    oldPrice:null,
    price:null,
    description:null,
    filePath:"",
    length:"0"
  },
  bindSortChange:function(event){
    var that = this
    // console.log(event.detail.value)
    that.setData({
      index: event.detail.value,
      sort: that.data.array[event.detail.value].id
    })
    // console.log(that.data.sort)
  },
  chooseImage:function(){
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          file: res.tempFilePaths,
          filePath:res.tempFilePaths[0]
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
  description:function(event){
      //console.log(event)
      var that = this
      that.setData({
        length:event.detail.cursor,
        description:event.detail.value
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
    }else{
      if (that.data.sort == null) {
        wx.showToast({
          title: '请选择商品类别',
          icon: 'none',
          duration: 2000
        });
      }else{
        if (that.data.oldPrice == null || that.data.oldPrice.trim() == '') {
          wx.showToast({
            title: '请填写商品原价',
            icon: 'none',
            duration: 2000
          });
        }else{
          if (that.data.price == null || that.data.price.trim() == '') {
            wx.showToast({
              title: '请填写商品价格',
              icon: 'none',
              duration: 2000
            });
          }else{
            if (that.data.file == null) {
              wx.showToast({
                title: '请上传您的商品图片',
                icon: 'none',
                duration: 2000
              });
            }else{
              wx.showLoading({
                title: '正在发布'
              })
              setTimeout(function(){
                //上传文件
                wx.uploadFile({
                  url: app.globalData.host + '/good/uploadOSSImage',
                  filePath: that.data.filePath,
                  name: "file",
                  //上传成功
                  success: function (res) {
                    //成功返回上传后的图片URL地址
                      //console.log(res.data)
                      var imageUrl = JSON.parse(res.data).imageUrl
                      //未填写商品描述
                      if(that.data.description == null){
                        wx.request({
                          url: app.globalData.host + '/good/save',
                          data: {
                            "openId": app.globalData.openId,
                            "name": that.data.name,
                            "sort": that.data.sort,
                            "oldPrice": that.data.oldPrice,
                            "currentPrice": that.data.price,
                            "imageUrl": imageUrl
                          },
                          method: 'POST',
                          header: {
                            'Content-Type': 'application/json',
                          },
                          success(res) {
                            //console.log(res)
                            //this.globalData.openid = res.data.openid
                              wx.showToast({
                                title: '发布成功',
                                icon: 'success',
                                duration: 2500
                              });
                              setTimeout(function () {
                                wx.redirectTo({
                                  url: '/pages/mine/myPush/myPush?active=1',
                                })
                              }, 2500)
                          },
                          fail: function (error) {
                            wx.showToast({
                              title: '服务器异常',
                              icon: 'loading',
                              duration: 2000
                            });
                          }
                        })
                      }
                      //填写了商品描述
                      else{
                        wx.request({
                          url: app.globalData.host + '/good/save',
                          data: {
                            "openId": app.globalData.openId,
                            "name": that.data.name,
                            "sort": that.data.sort,
                            "oldPrice": that.data.oldPrice,
                            "currentPrice": that.data.price,
                            "imageUrl": imageUrl,
                            "description": that.data.description
                          },
                          method: 'POST',
                          header: {
                            'Content-Type': 'application/json',
                          },
                          success(res) {
                            //console.log(res)
                            //this.globalData.openid = res.data.openid
                              wx.showToast({
                                title: '发布成功',
                                icon: 'success',
                                duration: 2500
                              });
                              setTimeout(function () {
                                wx.redirectTo({
                                  url: '/pages/mine/myPush/myPush?active=1',
                                })
                              }, 2500)
                          },
                          fail: function (error) {
                            wx.showToast({
                              title: '服务器异常',
                              icon: 'loading',
                              duration: 2000
                            });
                          }
                        })
                      }
                  },
                  fail: function (error) {
                    wx.showToast({
                      title: '图片上传失败，请重试',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                })
              },500)
            }
          }
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取商品类目
    wx.request({
      url: app.globalData.host + '/category/list',
      method:'GET',
      success(res){
        // console.log(res)
        that.setData({
          array: res.data.data
        })
        // console.log(that.data.array)
      },
      fail(error){
        wx.showToast({
          title: '获取商品类目失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
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