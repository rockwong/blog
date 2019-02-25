---
tags: [Notebooks/HTML-CSS]
title: 浏览器bug
created: '2019-02-25T14:16:31.311Z'
modified: '2019-02-25T14:29:04.525Z'
---

#浏览器bug

##safari flipInX 显示bug （被切掉 闪显）
>*Note: Safari in Mountion Lion (OS 10.8) has a display glitch with the Flippers. They may not appear at all until the animation is completed, or the page may have other artifacting. One fix is to add overflow: hidden to the parent div.*

## IE浏览器下input背景为none或透明时无法选中
>解决办法：加上`background:url(about:blank)`


###input 在IE6,ie7 下有父标签的边距。
> 在input的前面加上空白的span  或者用空白的标签包裹input
