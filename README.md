# （伪）网易云音乐： 【什么网抑云被抢注了】 微信小程序开发项目
## 项目背景（Background）
本项目是某零基础文科专业学子移动媒体实践短学期课程的课程作业，后端接口调用的是网易云音乐的真实API数据，开发时长约为一个星期。

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
## Badge
## 相关项目
## 主要项目负责人
## 参与贡献方式
## 开源协议
