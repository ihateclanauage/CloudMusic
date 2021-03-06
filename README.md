# （伪）网易云音乐： 【什么网抑云被抢注了】 微信小程序开发项目
## 项目背景（Background）
本项目是某零基础文科专业学子移动媒体实践短学期课程的课程作业，后端接口调用的是网易云音乐的真实API数据，实际开发时长约为一个星期。

目前已经基本实现了轮播图、每日推荐、歌曲播放、视频播放、用户登录（真实网易云账号）、歌曲检索、歌单检索、视频检索、动态排行等主要功能，但距离真正的企业级应用仍然十分遥远，需要完善大量细节。

### 本项目的代码部分包括：
1. 前端的页面搭建（WXML, WXSS）
2. 数据交互、动画功能（Js）
3. 云数据库和云函数

具体实现中大量参考了b站上的项目课程和gitee中的开源代码，在此非常感谢各位前辈们的慷慨分享。

### 本项目的设计与实现思路：

#### 文件结构树
    │  .gitignore
    │  app.js
    │  app.json             // 小程序开发配置文件
    │  app.wxss
    │  list.txt
    │  project.config.json  // 云开发配置文件
    │  sitemap.json         // 页面导航
    │  
    ├─cloudfunction         // 云数据库
    ├─components            // 自定义组件
    │  └─NavHeader
    │          
    ├─images
    │  │  image.wxss        // iconfont 矢量图标
    │  │  png
    │  └─ my
    │          
    ├─pages
    │  ├─login              // 用户登录页
    │  ├─musiclist          // 歌单列表
    │  ├─my                 // 用户个人页
    │  ├─play               // 歌曲播放页
    │  ├─recommandsonglist  // 每日推荐
    │  ├─search             // 搜索功能
    │  ├─songlist           // 应用首页
    │  └─video              // 视频页面
    │          
    └─utils
            config.js       // 端口配置页面
            request.js      // 网络请求配置页面
            util.js

#### 网络请求与数据传输
     本地客户端（localhost: 3000）--> Node.js 中间层接口 --> 网易云开放API
            ^
            |
      NatApp内网穿透
            ^
            |
       手机端小程序
     
#### UI设计与动画效果
[![首页](https://z3.ax1x.com/2021/07/18/W8Jdjf.jpg)](https://imgtu.com/i/W8Jdjf)
[![搜索](https://z3.ax1x.com/2021/07/18/W8JFnU.jpg)](https://imgtu.com/i/W8JFnU)
[![视频页](https://z3.ax1x.com/2021/07/18/W8JRg0.jpg)](https://imgtu.com/i/W8JRg0)
[![推荐页](https://z3.ax1x.com/2021/07/18/W8J4DU.jpg)](https://imgtu.com/i/W8J4DU)
[![个人页](https://z3.ax1x.com/2021/07/18/W8JbCR.jpg)](https://imgtu.com/i/W8JbCR)

## 安装

### 预先需要的开发工具：
1. 微信开发工具
2. Node.js
3. NatApp

### 配置：
- 对于那些只要在PC端模拟器上看到小程序演示效果的朋友们，你们需要：
    - 安装Node.js
    - 下载本项目中的***硅谷音乐_server***文件夹
    - 在该文件夹的目录中打开cmd，输入 npm start

- 对于那些希望能在手机上看到实际效果的朋友们，你们需要：
    - 安装Node.js
        - 下载本项目中的***硅谷音乐_server***文件夹
        - 在该文件夹的目录中打开cmd，输入 npm start
    - 安装NatApp
        - 按官方文档的指示申请一个免费的子网穿透账号
        - 打开cmd，输入 natapp -authtoken=用户参数指令
        - 将git下来的源代码导入微信开发工具之中
        - 打开utils文件夹中的config.js文件，将第4行代码语句 mobileHost: "http://9snjgv.natappfree.cc" 中的网址改成你申请的域名
        - 打开utils文件夹中的request.js文件，将第27行代码语句 url: config.host + url 中的 config.host 改为 config.mobileHost



## 使用
目前功能的实现情况：

    [√] 轮播图
    
    [x] 推荐歌单
    
        [√] 每日推荐
        
        [√] 排行榜
    
        [x] 歌单广场
    
    [√] 搜索功能
    
        [√] 单曲搜索
        
        [√] 歌单搜索
        
        [√] 视频搜索
    
    [x] 视频功能
        
        [√] 视频列表
        
        [x] 单页播放
        
    [√] 个人页面
        
        [√] 登录
        
        [x] 收藏
        
        [√] 听歌排行
        
    [x] 播放页面
    
        [√] 播放功能
        
        [x] 评论详情
        
        [x] 歌单列表
        

演示详情请见：[b站链接](https://www.bilibili.com/video/BV1bq4y1W7Ny)
## Badge
## 相关项目
1. [尚硅谷2021版微信小程序开发（零基础小程序开发入门到精通）](https://www.bilibili.com/video/BV12K411A7A2?from=search&seid=10368158989606063315)
2. [仿网易云音乐小程序 效果展示（附源码）](https://www.bilibili.com/video/BV1kU4y1b7EC?from=search&seid=13949774487844410701)
3. [3天带你完成最新版网易云小程序开发包教包会包分配！！！](https://www.bilibili.com/video/BV1Yy4y1877y?from=search&seid=10368158989606063315)
>这里是一点可看可不看的废话：
>
>作为完全零基础的菜鸟，我的学习路径是：3->1->2。
>
>其实本来只想着把第三个视频教程做完就可以交差了，但看到最后才发现这个教程的完成度很糟糕，只能带你做完一个非常简略的搜索功能和音乐播放功能。
>
>于是我怒而打开了播放量最高的第一个视频，并颇为沮丧地发现专业培训机构做出来的视频确实能带给学习者截然不同的体验……怎么说呢，也算是吸取了很有价值的教训吧。
>
>所以目前项目中代码的解耦水平是比较糟糕的，原因在于它调用了两类不同的接口，并且用一种很扭曲的方式把页面之间的传值拼接在了一起，之后应当会努力优化掉这个问题。
>
>总之，如果大家也像我一样手痒整活的话，请务必务必从第一个教程开始！
## 主要项目负责人
头发已经掉光了写出来的东西都是辣鸡但依然觉得自己很牛逼编程很开心的[**@hotGingerCola**](https://github.com/ihateclanauage)
## 参与贡献方式
我变秃了，也变强了
## 开源协议
虽然我很想说大家可以随便用我的代码——

但是我抄了好多不许商用的大佬源码，所以这里也不许商用啦。
