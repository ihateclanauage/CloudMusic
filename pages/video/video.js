// pages/video/video.js
import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [], // 导航标签数据
    navId: '', // 导航的标识
    videoList: [], // 视频列表数据
    videoId: '', // 视频id标识
    videoUpdateTime: [], // 记录video播放的时长
    isTriggered: false, // 标识下拉刷新是否被触发
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getVideoGroupListData()
  },

  // 获取导航数据
  async getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list');

    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 14),
      navId: videoGroupListData.data[0].id
    })
  
    // 获取视频列表数据
    this.getVideoList(this.data.navId);
  },

  // 获取视频列表数据
  async getVideoList(navId){
    if(!navId){
      return;
    }

    let videoListData = await request('/video/group', {id: navId});
    // 师傅，别加载了
    wx.hideLoading()
    console.log(videoListData.msg)
    if(videoListData.msg == '需要登录'){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    this.setData({
      videoList: videoListData.datas
    })

  },

  // 点击切换导航标签后跟着切换列表
  changeNav(event){
    let navId = event.currentTarget.id; // 通过id向event传参的时候如果传的是number会自动转换成string
    // let navId = event.currentTarget.dataset.id;
    this.setData({
      navId: navId>>>0,
      videoList: []
    })
    // 显示正在加载
    wx.showLoading({
      title: '正在加载'
    })
    // 动态获取当前导航对应的视频数据
    this.getVideoList(this.data.navId);
  },

  // 用户点击播放视频
  handlePlay(event){
    let vid = event.currentTarget.id
    // 获得视频的唯一id标识
    this.setData({
      videoId: vid
    })
    // 创建控制video标签的实例对象,但不知为何这段代码是无效的……
    this.videoContext = wx.createVideoContext(vid, this)
    console.log(this.videoContent)
    console.log(this.data.videoId+"  "+this.data[0].videoList)
    this.videoContent.play()
  },

  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
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
    console.log(from);
    if(from === 'button'){
      return {
        title: '来自高贵内测会员的转发',
        page: '/pages/video/video',
        imageUrl: '/images/my/vip-card-bg.png.jpg'
      }
    }else {
      return {
        title: '来自高贵内测会员的转发',
        page: '/pages/video/video',
        imageUrl: '/images/my/vip-card-bg.png.jpg'
      }
    }
  }
})