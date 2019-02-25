---
tags: [Notebooks/HTML-CSS]
title: 常用HTML代码
created: '2019-02-25T14:16:31.309Z'
modified: '2019-02-25T14:29:04.526Z'
---

# 常用HTML代码

##meta设置
``` html
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <!--
  	user-scalable=no： 禁止用户缩放
  	maximum-scale=1 最大缩放比例
  -->
  
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--让IE浏览器运行最新的渲染模式-->
  
  <meta content="yes" name="apple-mobile-web-app-capable" />
  <!--iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览-->
  
  <meta content="black" name="apple-mobile-web-app-status-bar-style" />
  <!--iphone的私有标签，它指定的iphone中safari顶端的状态条的样式-->
  
  <meta content="telephone=no" name="format-detection" />
  <!--告诉设备忽略将页面中的数字识别为电话号码-->
  
```

## 表单
```html
<!--手机输入文本 默认数字键盘-->
<input type="number"></input>
```
##制表符

●  X ×

##将IOS网页变成WEB APP
>参考:
>[把你的网站改造成一个iOS Web App](http://weizhifeng.net/make-web-app-more-native.html)

###IOS预设图标

``` html
<!--
   IOS网站快捷方式icon二者选一，区别如下：
	apple-touch-icon: 加上IOS的一些默认效果圆角，阴影，反光
	apple-touch-icon-precomposed: 不添加任何效果
-->
<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png"/>

<!--如果想为不同的设备准备不同尺寸的icon -->
<link rel="apple-touch-icon" href="touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone-retina.png" />
<link rel="apple-touch-icon" sizes="144x144" href="touch-icon-ipad-retina.png" />

<!--
	如果HTML中没有指定ICON,IOS将在WEB根目录下依下面顺序寻找：
	apple-touch-icon-57x57-precomposed.png
	apple-touch-icon-57x57.png
	apple-touch-icon-precomposed.png
	apple-touch-icon.png
-->
```
### 启动界面
像原生应用一样，你也可以给网站加上一个启动界面，很简单：
在iPhone和iPod touch上，尺寸大小必须为320 x 460。

```html
	<link rel="apple-touch-startup-image" href="/startup.png">
```

### 隐藏Safari用户栏
Safari的用户栏和地址栏进行隐藏，这个叫作standalone模式，
你可以通过window.navigator.standalone来检测当前是否是standalone模式

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```

###优化safari 点击链接新开tab的体验
```js
// Mobile Safari in standalone mode
if(("standalone" in window.navigator) && window.navigator.standalone){

    // If you want to prevent remote links in standalone web apps opening Mobile Safari, change 'remotes' to true
    var noddy, remotes = true;

    document.addEventListener('click', function(event) {

        noddy = event.target;

        // Bubble up until we hit link or top HTML element. Warning: BODY element is not compulsory so better to stop on HTML
        while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
            noddy = noddy.parentNode;
        }

        if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes))
        {
            event.preventDefault();
            document.location.href = noddy.href;
        }

    },false);
}
```
