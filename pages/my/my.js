import request from "../../utils/request";

let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coveTransition: '',
    userInfo: {}, // 用户信息
    recentPlayList: [], // 用户播放记录
  },
  
  // 跳转至登录login页面的回调
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  // 当下拉到最底时触发该onBottom() 方法,获得设备可用屏幕高度:
  onBottom: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          "wh": res.windowHeight
        })
        console.log("wh", that.data.wh);
      }
    })
  },

  async getUserRecentPlayList(userId){
    let recentPlayListData = await request('/user/record', {uid: userId, type: 0});
    let index = 0;
    let recentPlayList = recentPlayListData.allData.slice(0,10).map(item => {
      item.id = index++;
      return item;
    })
    this.setData({
      recentPlayList
    })
  },

  handleTouchstart:function(event){
    this.setData({
      coveTransition: ''
    })
    startY = event.touches[0].clientY
    console.log(event.touches[0].clientY)
  },

  handleTouchmove:function(event){
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY;
    // 动态更新coverTransform的状态值

    // 设定滑动的上限和下限
    if(moveDistance <= -100){
      return;
    }
    if(moveDistance >= 100){
      moveDistance = 100;
    }

    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`,
    })
  },

  handleTouchend:function(event){
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coveTransition: 'transform 1s linear'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取用户的基本信息
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){ // 用户登录
      // 更新userInfo的状态
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
    // 获取用户播放记录
    this.getUserRecentPlayList(this.data.userInfo.userId)

    // 调用防止下拉出现留白的方法
    var that = this;
       wx.getSystemInfo({
      success: function(res) {
        that.setData({
          "wh": res.windowHeight
        })
       },
      })
    }
})
