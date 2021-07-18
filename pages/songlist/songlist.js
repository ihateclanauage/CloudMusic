// pages/songlist/songlist.js
import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图列表
    background: [],
    // 歌曲列表的数据
    musiclist:[],
    // 歌曲列表的数量
    musicSum:20,
    // 当前接口无法正常获取歌曲图片，需要另外调用api接口
    imgList:[],
    // 输入框字符监听
    word:"",
    // 歌曲id所在的列表
    Idlist:[],
    // 推荐歌曲列表
    recommendList:[]
  },

  // 单击播放按钮后调用play方法
  // evens:wxml中携带的数据
  play: function (evens) {
    // console.log(evens.currentTarget.dataset.id)
    // //把id传到另一个页面
    // var id=evens.currentTarget.dataset.id
    // wx.navigateTo({
    //   url: '/pages/play/play?id='+id,
    // })
    this.onClickCell(evens)
  },

  // A页面触发事件, 跳转到B页面
  onClickCell: function (evens) {
    let contacts = {
       id: evens.currentTarget.dataset.id,
       Idlist: this.data.Idlist,
   }
   // 先对数据进行JSON
   let jsonStr = JSON.stringify(contacts)
   // 对数据进行URI编码, 如果不进行这一步操作, 数据有可能会被截断, 少量数据没有问题, 如果是一个大的对象, 就容易被截断获取不到完整的数据
   let data = encodeURIComponent(jsonStr)

   wx.navigateTo({
     url: `/pages/play/play?contacts=${data}`,
   })  
 },

  // 跳转到搜索页面
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 监听input输入框，当中字符发生改变时执行方法
  keychange:function(result){
    // console.log(result)
    var word = result.detail.value
    // data数据修改
    this.setData({
      word:word
    })
  },

  // 跳转至音乐列表页面
  toMusicList(e) {

    wx.navigateTo({
      url: '/pages/musicList/musicList?musiclistid=' + e.currentTarget.dataset.musiclistid
    })
  },
  
  // 通过id获取图片封面(使用递归方法)
  getMusicImage:function(Idlist,i,length){
    var that = this
    var imgList = this.data.imgList
    //用通过api获取的歌曲id拼凑出网址url
    var url = "https://music.163.com/api/song/detail/?id=1359595520&ids=["+Idlist[i]+"]"
    console.log(url)
    wx.request({
      url: url,
      success: (result) => {
        var picUrl = result.data.songs[0].album.picUrl
        imgList[i] = picUrl
        this.setData({
          imgList: imgList
        })
        //跳出递归的条件
        if(++i<length){
          that.getMusicImage(Idlist,i,length)
        }
      },
    })
  },

  //触发搜索按钮执行的方法
  search:function(){
    console.log(this.data.word)
    // 搜索功能的实现思路
    // 1、拿到用户输入的值
    // 2、改变接口当中的关键字
    // 3、网络请求
    // 4、获取json格式的数据
    // 5、解析数据，并将清洗后的数据存储到data当中
    // 6、在html中遍历渲染
    var keyword = this.data.word
    var musicSum = this.data.musicSum
    var url = "https://music.163.com/api/search/get?s="+keyword+"&type=1&limit="+musicSum
    wx.request({
      url: url,
      success: (result) => {
        var songs = result.data.result.songs
        // console.log(songs)
        this.setData({
          musiclist:songs
        })        
        // 调用存id的方法
        this.saveMusicId()
        var IdList = this.data.Idlist
        // 调用找封面的方法
        this.getMusicImage(IdList,0,IdList.length)
      },
    })
  },

  // 将当前页面所有歌曲id存储入idlist
  saveMusicId:function(){
    var musiclist = this.data.musiclist
    var IdList = []
    for(var j = 0; j < musiclist.length; j++){
      IdList[j] = musiclist[j].id
    }
    this.setData({
      Idlist: IdList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    //在页面初始化的同时加载轮播图
    var background = await request('/banner', {type: 2})
    console.log(background)
    this.setData({
      background:background.banners
    })

    // 加载歌曲推荐
    var recommendListData = await request('/personalized', {limit: 10});
    this.setData({
      recommendList: recommendListData.result
    })

    let index = 0;
    let resultArr = [];
    while (index < 5){
      let topListData = await request('/top/list', {idx: index++});
      // splice(会修改原数组，可以对指定的数组进行增删改) slice(不会修改原数组)
      let topListItem = {name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0, 5)};
      resultArr.push(topListItem);
      // 不需要等待五次请求全部结束才更新，用户体验较好，但是渲染次数会多一些
      this.setData({
        topList: resultArr
      })
    }

    // 调用防止下拉出现留白的方法
    var that = this;
       wx.getSystemInfo({
      success: function(res) {
        that.setData({
          "wh": res.windowHeight
        })
       },
      })
  },

  // 跳转至推荐歌单
  ToRecommandList(){
    wx.navigateTo({
      url: '/pages/recommandsonglist/recommandsonglist',
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
    // 加载更多歌曲
    var musicSum = this.data.musicSum + 2
    this.setData({
      musicSum: musicSum
    })
    this.search()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
