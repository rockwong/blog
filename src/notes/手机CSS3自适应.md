---
tags: [Notebooks/Javascript]
title: 手机CSS3自适应
created: '2019-02-25T14:15:27.035Z'
modified: '2019-02-25T14:18:17.495Z'
---

#手机CSS3自适应

为了响应不用手机屏幕的快捷方式，用css3 将页面缩放到适合屏幕尺寸。

```js
// 320、505为预期宽高,.main存放需要自适应内容的容器

var i= $(window).width()/320;
var h= $(window).height()/505;
$(".main").css("-webkit-transform","scale(" + i +"," + h+ ")");

````
