---
tags: [Notebooks/Javascript]
title: 编写可以维护的Javascript
created: '2019-02-25T14:15:27.030Z'
modified: '2019-02-25T14:18:17.491Z'
---

#编写可以维护的Javascript

## 隔离应用逻辑:应用代码与事件代码分开

> 处理事件函数中将事件代码与应用代码分开
>  代码尽量少用全局变量

```js

	var Mytest={
			handerClick:function(event){
				this.showPopup(event);
			},
			showPopup:function(event){
			 var popDom=document.getElementById('popup');
			 popDom.style.left=event.clientX+'px';
			 popDom.style.top=event.clientY+'px';
			}
		};
		document.getElementById('test').addEventListener('click',function(event){
		 	Mytest.handerClick(event);
		})
		
```

##不要分发事件对象
> 事件函数应为接触到event对象的唯一函数，在传入应用逻辑前进行必要操作。
> 如取消默认事件，及需要传入的属性值

```js

	var Mytest={
			handerClick:function(event){
				event.preventDefault();
				this.showPopup(event.clientX,event.clientY);
			},
			showPopup:function(x,y){
			 var popDom=document.getElementById('popup');
			 popDom.style.left=x+'px';
			 popDom.style.top=y+'px';
			}
		};
		document.getElementById('test').addEventListener('click',function(event){
		 	Mytest.handerClick(event);
		})
		
```
