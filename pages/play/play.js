// pages/play/play.js
import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 歌曲id
    musicId:'12345',
    // 歌曲id所在的列表
    Idlist:[],
    // 歌曲播放状态
    action:{method:'play'},
    // 歌曲名称
    name:"",
    //  歌曲封面url
    picUrl:"",
    // 歌曲的歌词列表
    lrclist:[],
    // 歌词的当前定位
    index:-1,
    // 定位的歌词滚动位置
    top:0,
    // 播放模式
    mode:'loop',
    // 当前播放时间
    playtime:"00:00",
    // 歌曲总时长
    fulltime:"03:30",
    // 进度条最大值
    max:'',
    // 当前进度条的位置
    value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过options可以获取页面路由过来的数据
    let contacts = {}
    let jsonStr = decodeURIComponent(options.contacts)
    contacts = JSON.parse(jsonStr)
    // console.log(contacts)
    var id = contacts.id
    var Idlist = contacts.Idlist
    console.log(id)
    //用得到的id替换data中的数据
    this.setData({
      musicId: id,
      Idlist: Idlist
    })
    this.musicShow()
    this.lyricShow()
  },

  // 歌曲详情显示与更新
  musicShow:function(){
    var id = this.data.musicId
    var url = 'https://music.163.com/api/song/detail/?id=1359595520&ids=['+id+']'
    console.log(url)
    //网络请求json数据
    wx.request({
      url: url,
      success: (result) => {
        //获取歌曲名称
        var name = result.data.songs[0].name
        //获取封面图片
        // console.log(result.data.songs[0].album.picUrl)
        var picUrl = result.data.songs[0].album.picUrl
        this.setData({
          name:name,
          picUrl:picUrl,
        })
      },
    })
  },
  

  //歌词显示与更新
  lyricShow:function(){
    // 思路：
    // 1、拿到当前的歌曲id
    // 2、拼接src
    // 3、request请求
    // 4、解析json文件
    // 5、字符串处理
    var id = this.data.musicId
    var src="http://music.163.com/api/song/lyric?os=pc&id="+id+"&lv=-1&tv=-1"
    console.log(src)
    wx.request({
      url: src,
      success: (result) => {
        //获取歌词
        var Strlyc = result.data.lrc.lyric
        var tlyc = result.data.tlyric.lyric
        //处理字符串：
        //1、把字符串拆分成一句一句的列表
        var lyclist = Strlyc.split('\n')
        var tlyc = tlyc.split('\n')
        //存储最终数据的列表
        var lrctimeList = []
        var tlycList = []
        //2、拆分出时间数据和歌词文本
        //时间格式：[01:54] -> 运用正则表达式
        for(var i = 0 ; i < lyclist.length ; i++){
          var re = /\[\d{2}\:\d{2}\]/
          var time = lyclist[i].match(re)
          if (time == null){
            var re = /\[\d{2}\:\d{2}\.\d+]/
            time = lyclist[i].match(re)
          }
          if(time != null){
            //使用正则表达式拆分出中文歌词
            var text = lyclist[i].replace(re,'')
            //拿到时间字符串
            var Strtime = time[0]
            //去除括号
            Strtime = Strtime.slice(1,-1)
            //以 : 为基准拆分为 分 与 秒，计算每句歌词出现的时间（秒数）
            var splitlist = Strtime.split(':')
            var time = parseFloat(splitlist[0]*60) + parseFloat(splitlist[1])
            //3、将换算成秒的时间和歌词写入同一个二维数组中
            lrctimeList.push([time,text])
          }
           // 存储数组到data当中
          this.setData({
          lrclist:lrctimeList,
        })
        }
      },
      fail: (result)=>{
        this.setData({
          lrclist:['纯音乐，请欣赏']
        })
      },
    })
  },

  
  // 播放状态更改函数
  playdate: function(){
    var that = this
    // 思路：修改data当中的action的值 
    console.log(that.data.action.method)
    var date=that.data.action.method
    if (date=="play") {
      this.setData({
        action: {
          "method":"pause"
        }
      })
    } else {
      this.setData({
        action: {
          "method":"play"
        }
      })
    }
  },

  //循环模式更改函数
  changemode:function(){
    if (this.data.mode=='loop'){
      this.setData({
        mode:'single'
      })
    }else{
      this.setData({
        mode:'loop'
      })
    }
  },

  // 歌曲播放完毕之后执行循环模式
  changeMusic:function(){
    this.setData({
      action:{"method":'pause'}
    })
    // 判断当前循环模式
    var mode = this.data.mode
    // single 单曲 loop 循环
    if (mode == 'single') {
      // 单曲循环 设置musicId为目前播放的id 并刷新播放状态
      this.setData({
        musicId:this.data.musicId,
        action:{"method":'play'},
      })
    }// 列表循环
    else{
      this.nextSong()
    }
  },

// 切换上一首歌
  lastSong:function(){
    // 思路：
    // 1、拿到当前歌曲id
    // 2、拿到当前id所在的列表
    // 3、在Idlist中检索当前id的上一首歌
    var id = this.data.musicId
    var Idlist = this.data.Idlist
    var index = -1
    for (var i = 0; i<Idlist.length; i++){
      if (Idlist[i] == id){
        index = i
        break
      }
    }

    // 如果当前的id正好在列表最前面，则跳转到列表的最后
    if(index == 0){
      this.setData({
        musicId : Idlist[Idlist.length-1]
      })
    }
    else{
      this.setData({
        musicId : Idlist[index-1]
      })
    }

    // 更新播放
    this.setData({
      action:{"method":'play'}
    })

    // 更改页面信息
    this.musicShow()
    this.lyricShow()
  },

  // 切换下一首歌
  nextSong:function(){
    // 思路：
    // 1、拿到当前歌曲id
    // 2、拿到当前id所在的列表
    // 3、在Idlist中检索当前id的下一首歌
    var id = this.data.musicId
    var Idlist = this.data.Idlist
    var index = -1
    for (var i = 0; i<Idlist.length; i++){
      if (Idlist[i] == id){
        index = i
        break
      }
    }

    // 如果当前的id正好在列表最后，则跳转到列表的第一首歌
    if(index == Idlist.length - 1){
      this.setData({
        musicId : Idlist[0]
      })
    }
    else{
      this.setData({
        musicId : Idlist[index+1]
      })
    }

    // 更新播放状态
    this.setData({
      action:{"method":'play'}
    })

    // 更改页面信息
    this.musicShow()
    this.lyricShow()
  },

  // 播放进度触发函数
  timechange:function(result){
    var that = this
    // console.log(result.detail.currentTime)
    // 获取当前播放时间
    var playtime = result.detail.currentTime
    // 获取总播放时长
    var fulltime = result.detail.duration

    //更新歌词
    //获取存储有歌词和时间的列表
    var lrcList = that.data.lrclist
    //遍历歌词的二维数组
    for(var i = 0 ; i < lrcList.length ; i++){
      //判断每一句歌词的时间区间
      if( (lrcList[i][0] < playtime) && (playtime < lrcList[i+1][0]) ){
        // console.log(lrcList[i][1])
        //拿到当前播放的歌词的下标
        this.setData({
          index:i
        })
      }
    }
    // 触发歌词滚动函数
    this.lyricRoll()

    // 更新进度条
    this.setData({
      max:fulltime,
      value:playtime,
    })
    // 更新播放时长和总时长
    var playtime = this.minute_and_second(playtime)
    var fulltime = this.minute_and_second(fulltime)
    this.setData({
      playtime:playtime,
      fulltime:fulltime,
      duration:result.detail.duration,
    })
    // console.log("playtime="+this.data.playtime+", fulltime="+this.data.fulltime)
  },
    
  // 歌词自动滚动函数
  lyricRoll:function(){
    // 定位自动滚动
    var index = this.data.index
    if (index > 5){
      this.setData({
        top:(index-5)*30
      })
      // console.log((index-5)*60)
    }
  },

  // 将当前播放时间换算为分：秒的格式
  minute_and_second:function(time){
    var minute = this.addZero(Math.floor(time/60))
    var second = this.addZero(Math.floor(time%60))
    return minute+":"+second
  },

  // 播放时间补零操作
  addZero:function(time){
    // 如果分/秒为个位，则在数字前补零
    if (Math.floor(time / 10) == 0){
      time = '0' + time
    }
    return time
  },

  // 手动调整进度条后改变歌曲进度
  sliderchange:function(result){
    var value = result.detail.value
    this.setData({
      value:value
    })
    this.setData({
      action:{
        method:'setCurrentTime',
        data:value
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