// pages/goods/goods.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    // typeArrays: ['全部分类', '电脑数码', '家用电器', '运动户外', '服饰鞋包', '日用百货', '食品生鲜', '图书音像', '办公设备', '游戏物品'],
    typeArrays:[],
    sort:null,
    search:null,
    goods:[],
    page:0,
    pageSize:6,
    total:null
  },


  search:function(event){
    //console.log(event.detail)
    var that = this
    that.setData({
      search: event.detail
    })
  },


  onSearch: function () {
    var that = this
    wx.showLoading({
      title: '正在查询',
      mask: true
    })
    //分页查询
    // 点击搜索时初始化分页信息
    that.setData({
      page: 0,
      pageSize: 6,
      total: null
    })
    let page = that.data.page
    let pageSize = that.data.pageSize
    wx.request({
      url: app.globalData.host + '/good/page?page=' + page + '&pageSize=' + pageSize,
      data: {
        "sort": that.data.sort,
        "name": that.data.search,
        "examine": 1, // 已审核
        "status": 0, // 未下架
        "trade": 0 //未交易
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      success(res) {
        // console.log(res)
        setTimeout(function () {
          wx.hideLoading()
          that.setData({
            goods: res.data.data.list,
            page: res.data.data.pagination.current,
            pageSize: res.data.data.pagination.pageSize,
            total: res.data.data.pagination.total
          })
        }, 400)
      },
      fail: function (error) {
        wx.showToast({
          title: '服务器异常',
          icon: "none",
          duration: 2500
        })
      }
    })
  },

  onChange: function (event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    that.setData({
      search:null,
      active: event.detail
    }) 
    //console.log(type);
    that.setData({
      sort: that.data.typeArrays[event.detail].id
    })
    // console.log(that.data.sort)

    //分页查询
    // 点击分类时初始化分页信息
    that.setData({
      page: 0,
      pageSize: 6,
      total: null
    })
    let page = that.data.page
    let pageSize = that.data.pageSize
    wx.request({
      url: app.globalData.host + '/good/page?page=' + page + '&pageSize=' + pageSize,
      data: {
        "sort": that.data.sort,
        "name": that.data.search,
        "examine": 1, // 已审核
        "status": 0, // 未下架
        "trade": 0 //未交易
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      success(res) {
        // console.log(res)
        setTimeout(function () {
          wx.hideLoading()
          that.setData({
            goods: res.data.data.list,
            page: res.data.data.pagination.current,
            pageSize: res.data.data.pagination.pageSize,
            total: res.data.data.pagination.total
          })
        }, 300)
      },
      fail: function (error) {
        wx.showToast({
          title: '服务器异常',
          icon: "none",
          duration: 2500
        })
      }
    })
    //console.log(this.data.sort)
  },



  loadMore: function () {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    let page = that.data.page
    let pageSize = that.data.pageSize
    let total =that.data.total
    let totalPage = total % pageSize == 0 ? total / pageSize : Math.floor(total / pageSize) +1
    // console.log(totalPage)
    if(page < totalPage){
      // 说明还未加载到最后一页
      wx.request({
        url: app.globalData.host + '/good/page?page=' + page + '&pageSize=' + pageSize,
        data: {
          "sort": that.data.sort,
          "name": that.data.search,
          "examine": 1, // 已审核
          "status": 0, // 未下架
          "trade": 0 //未交易
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        success(res) {
          // console.log(res)
          setTimeout(function () {
            wx.hideLoading()
            let newGoods = that.data.goods.concat(res.data.data.list)
            that.setData({
              goods: newGoods,
              page: res.data.data.pagination.current
            })
          }, 300)
        },
        fail: function (error) {
          wx.hideLoading();
          wx.showToast({
            title: '服务器异常',
            icon: "none",
            duration: 2500
          })
        }
      })
    }else{
      wx.hideLoading();
      wx.showToast({
        title: '我是有底线的哦',
        icon:'none',
        duration:1500
      })
    }
  },


  info:function(event){
    //console.log(event.currentTarget.id)
    wx.request({
      url: app.globalData.host + '/good/updateBrowse',
      data: event.currentTarget.id,
      method: 'PUT',
      header: {
        'Content-Type': 'application/json',
      },
      success(res) {
        //console.log(res)
      }
    })
    wx.navigateTo({
      url: 'goodInfo/goodInfo?id='+event.currentTarget.id
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    wx.request({
      url: app.globalData.host + '/category/list',
      method:'GET',
      success(res){
        var newTypeArrays = res.data.data;
        var all = {
          "id":null,
          "name":"全部分类"
        }
        newTypeArrays.unshift(all);
        that.setData({
          typeArrays: newTypeArrays
        })
        // console.log(that.data.typeArrays)
      },
      fail(error){
        wx.showToast({
          title: '获取商品类目失败，请下拉刷新',
          icon:'none',
          duration:2000
        })
      }
    })
    //分页查询
    let page = that.data.page
    let pageSize = that.data.pageSize
    wx.request({
      url: app.globalData.host + '/good/page?page='+ page + '&pageSize='+ pageSize,
      data: {
        "sort": that.data.sort,
        "name": that.data.search,
        "examine": 1, // 已审核
        "status": 0, // 未下架
        "trade": 0 //未交易
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      success(res) {
        // console.log(res)
        setTimeout(function () {
          wx.hideLoading()
          that.setData({
            goods: res.data.data.list,
            page: res.data.data.pagination.current,
            pageSize: res.data.data.pagination.pageSize,
            total: res.data.data.pagination.total
          })
        }, 300)
      },
      fail: function (error) {
        wx.showToast({
          title: '服务器异常',
          icon: "none",
          duration: 2500
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    var that = this
    wx.showLoading({
      title: '正在刷新',
    })
    wx.request({
      url: app.globalData.host + '/category/list',
      method: 'GET',
      success(res) {
        var newTypeArrays = res.data.data;
        var all = {
          "id": null,
          "name": "全部分类"
        }
        newTypeArrays.unshift(all);
        that.setData({
          typeArrays: newTypeArrays
        })
        // console.log(that.data.typeArrays)
      },
      fail(error) {
        wx.showToast({
          title: '获取商品类目失败，请下拉刷新',
          icon: 'none',
          duration: 2000
        })
      }
    })
    //分页查询
    // 下拉刷新时初始化分页信息
    that.setData({
      page:0,
      pageSize:6,
      total:null
    })
    let page = that.data.page
    let pageSize = that.data.pageSize
    wx.request({
      url: app.globalData.host + '/good/page?page=' + page + '&pageSize=' + pageSize,
      data: {
        "sort": that.data.sort,
        "name": that.data.search,
        "examine": 1, // 已审核
        "status": 0, // 未下架
        "trade": 0 //未交易
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      success(res) {
        // console.log(res)
        setTimeout(function () {
          wx.stopPullDownRefresh()
          wx.hideLoading();
          that.setData({
            goods: res.data.data.list,
            page: res.data.data.pagination.current,
            pageSize: res.data.data.pagination.pageSize,
            total: res.data.data.pagination.total
          })
        }, 300)
      },
      fail: function (error) {
        wx.showToast({
          title: '服务器异常',
          icon: "none",
          duration: 2500
        })
      }
    })
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