---
tags: [Notebooks/HTML-CSS]
title: 常用CSS
created: '2019-02-25T14:16:31.308Z'
modified: '2019-02-25T14:29:04.526Z'
---

# 常用CSS

##覆盖微信 调整字体设置
###IOS
```css
body{ -webkit-text-size-adjust: 100% !important;}
```

###Android
在 Android 下，需要通过 WeixinJSBridge 对象将网页的字体大小设置为默认大小，并且重写设置字体大小的方法，让用户不能在该网页下设置字体大小。

```js
(function() {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }
    })();
```

##动画图片相关
```css
/*css模糊透明*/
#myDiv {
	-webkit-filter: blur(20px);
	-moz-filter: blur(20px);
	-o-filter: blur(20px);
	-ms-filter: blur(20px);
	filter: blur(20px);
	opacity: 0.4; 
}
/*  Mobile touch交互 ，类似PC的hover */
.btn-icon:active{
  -webkit-transform: scale3d(0.9, 0.9, 1);
}
```
##表单相关
```html
<!--关闭iOS中默认键盘自动大写-->
<input type="text" autocapitalize=”off” />
```

```css3
/* 清除input默认的阴影 */
input{
	-webkit-appearance: none;
	appearance: none;
}
```
### scroll 显示或隐藏 网页抖动的问题
```css
// scroll 
html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}
```

##文本处理
```css
/*将一行显示的溢出文本显示为省略号*/
.ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
/*将两行显示的溢出文本显示为省略号*/
.ellipsis{display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;}

/* CCS3 rem 字体单位 */
html{font-size:62.5%; /* 10÷16=62.5% */}
body{font-size:12px;font-size:1.2rem ; /* 12÷10=1.2 */}
p{font-size:14px;font-size:1.4rem;} 

/* 改变选择文本颜色和背景色 */
::selection { background:色值;color:色值; } /*Ie9+,Webkit,Opera9.5+*/
::-moz-selection { background:色值;color:色值; } /*Mozilla Firefox*/

```

##页面及布局

# css 两端对齐布局
``` css

body {
    margin: 8px;
}

.prevNext {
    text-align: justify;
    border: 1px solid #ccc;
}

.prevNext a {
    display: inline-block;
    position: relative;
    top: 1.2em;
}

.prevNext:before{
    content: '';
    display: block;
    width: 100%;
    margin-bottom: -1.2em;
}

.prevNext:after {
    content: '';
    display: inline-block;
    width: 100%;
}

```

``` html
<div class="prevNext">
    <a class="prev" href="#">Previous Article</a>
    <a class="next" href="#">Second</a>
    <a class="next" href="#">Third</a>
    <a class="next" href="#">Next Article</a>
</div>
```

###DOM 事件
```css
<!--改变DOM事件，不产生事件，不被选中-->
.demo{
    touch-action: none; //取消touch事件
    -webkit-user-select: none; 
    -webkit-user-drag: none; 
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    user-select: none; //文本不可选
    
    pointer-events:none //不会成为鼠标事件的target
}
```
### 手机超出内容滚动

```css
overflow-y: scroll; /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch;
```
###去除inline-block空隙

```css
.dib-wrap {
    font-size:0;/* 所有浏览器 */
    *word-spacing:-1px;/* IE6、7 */
}
.dib-wrap .dib{
    font-size: 12px;
    letter-spacing: normal;
    word-spacing: normal;
    vertical-align:top;
}
@media screen and (-webkit-min-device-pixel-ratio:0){
/* firefox 中 letter-spacing 会导致脱离普通流的元素水平位移 */
     .dib-wrap{
            letter-spacing:-5px;/* Safari 等不支持字体大小为 0 的浏览器, N 根据父级字体调节*/
    }
}
.dib {
    display: inline-block;
    *display:inline;
    *zoom:1;
}
```

##Media query

###简单判断PC和手机

```css
	.demo{ }
@media (max-width:767px) {
    .demo{ }
}
```

###横竖版
```css
@media all and (orientation:portrait) { … }  //竖版
@media screen and (max-aspect-ratio: 13/9) { … } // 兼容小屏手机，增加比例选择，

@media all and (orientation:landscape) { … } //横版
```

###ipad
```css
/* iPads (landscape) ----------- */ 
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : landscape) {
	/* Styles */
}

/* iPads (portrait) ----------- */ 
@media only screen 
and (min-device-width : 768px) 
and (max-device-width : 1024px) 
and (orientation : portrait) { 
	/* Styles */ 
}

```
