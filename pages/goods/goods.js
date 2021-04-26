// pages/goods/goods.js
import { fetch } from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    // typeArrays: ['全部分类', '电脑数码', '家用电器', '运动户外', '服饰鞋包', '日用百货', '食品生鲜', '图书音像', '办公设备', '游戏物品'],
    typeArrays: [],
    sort: null,
    search: null,
    goods: [],
    page: 0,
    pageSize: 6,
    total: null
  },


  search: function (event) {
    //console.log(event.detail)
    var that = this
    that.setData({
      search: event.detail
    })
  },


  onSearch: function () {
    this.requestGoods();
  },

  onChange: function (event) {
    var that = this
    that.setData({
      search: null,
      active: event.detail,
      sort: that.data.typeArrays[event.detail].id
    })
    //分页查询
    this.requestGoods();
  },



  loadMore: function () {
    this.requestMoreGoods();
  },

  requestUpdateBrowse: function (id) {
    fetch({
      method: 'PUT',
      url: '/good/updateBrowse/' + id
    })
  },


  info: function (event) {
    // console.log(event.currentTarget.id)
    this.requestUpdateBrowse(event.currentTarget.id);
    wx.navigateTo({
      url: 'goodInfo/goodInfo?id=' + event.currentTarget.id
    })
  },

  requestMoreGoods: function () {
    let that = this
    let page = that.data.page
    let pageSize = that.data.pageSize
    let total = that.data.total
    let totalPage = total % pageSize == 0 ? total / pageSize : Math.floor(total / pageSize) + 1
    // console.log(totalPage)
    if (page < totalPage) {
      // 说明还未加载到最后一页
      fetch({
        url: '/good/page?page=' + page + '&pageSize=' + pageSize,
        method: 'POST',
        data: {
          "sort": that.data.sort,
          "name": that.data.search,
          "examine": 1, // 已审核
          "status": 0, // 未下架
          "trade": 0 //未交易
        },
      }).then((res) => {
        let newGoods = that.data.goods.concat(res.data.data.list)
        that.setData({
          goods: newGoods,
          page: res.data.data.pagination.current,
          total: res.data.data.pagination.total
        })
      })
    } else {
      wx.showToast({
        title: '我是有底线的哦',
        icon: 'none',
        duration: 1500
      })
    }
  },

  requestCategoryList: function () {
    var that = this;
    fetch({
      url: '/category/list',
      method: 'GET'
    }).then((res) => {
      var newTypeArrays = res.data.data;
      var all = {
        "id": null,
        "name": "全部分类"
      }
      newTypeArrays.unshift(all);
      that.setData({
        typeArrays: newTypeArrays
      })
    })
  },

  requestGoods: function () {
    var that = this;
    that.setData({
      page: 0,
      pageSize: 6,
    })
    let page = that.data.page
    let pageSize = that.data.pageSize
    fetch({
      url: '/good/page?page=' + page + '&pageSize=' + pageSize,
      method: 'POST',
      data: {
        "sort": that.data.sort,
        "name": that.data.search,
        "examine": 1, // 已审核
        "status": 0, // 未下架
        "trade": 0 //未交易
      }
    }).then((res) => {
      // console.log(res.data.data.list);
      that.setData({
        goods: res.data.data.list,
        page: res.data.data.pagination.current,
        pageSize: res.data.data.pagination.pageSize,
        total: res.data.data.pagination.total
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestCategoryList();
    //分页查询
    this.requestGoods();
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
    this.requestCategoryList();
    //分页查询
    this.requestGoods();
    wx.stopPullDownRefresh();
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