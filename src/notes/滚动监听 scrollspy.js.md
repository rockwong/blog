---
tags: [Notebooks/HTML-CSS]
title: 滚动监听 scrollspy.js
created: '2019-02-25T14:16:12.865Z'
modified: '2019-02-25T14:30:04.023Z'
---

# 滚动监听 scrollspy.js

1. 监听对象需为相对定位 `position:relative`,大部分是body。
2. html结构如下:

   ```html
   <body data-spy="scroll" data-target="#navbar-example">
   	<!--nav-->
  		<div id="navbar-example">
    		<ul class="nav">
    			<li class="active"><a href="#first">First contant</a></li>
    			<li><a href="#second">Second contant</a></li>
    		</ul>
  		</div>
  	<!--contant-->
  		<div id="first">...</div>
  		...
  		<div id="second">...</div>
	</body>
```
   
3.  通过javascript来启用监听:

 	```js
 	//offset 是计算滚动位置时相对于顶部的偏移量，默认是10px。
 	$('body').scrollspy({ target: '#navbar-example',offset:10 });
 	```
