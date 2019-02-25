---
tags: [Notebooks/Tools]
title: Chrome 调试工具
created: '2019-02-25T14:39:35.365Z'
modified: '2019-02-25T14:40:46.486Z'
---

# Chrome 调试工具

## 选取DOM元素

```js
//返回匹配规则的第一个元素,相当于document.querySelector('') 
$('tagName') 
$('.class')
$('#id')

//返回一个数组，$$('className')[0]来匹配其中一个元素
 $$('tagName')
 $$('.className')
```

## 编辑页面文本


```js
document.body.contentEditable=true
```

## 获取某个DOM元素绑定的事件


```js
getEventListeners($('selector')) 

//获取某种时间类型
getEventListeners($('#firstName')).click[0].listener

```

##监视事件

```js
monitorEvents($('selector'))
	
//监视具体事件
monitorEvents($('selector'),'eventName')
	
//监视多个事件
monitorEvents($('selector'),['eventName1','eventName3',….]) 
	
//停止监视
unmonitorEvents($('selector'))
```

## 获取代码块的运行时间

```js
console.time('myTime'); //设定计时器开始 - myTime
...Code
console.timeEnd('mytime'); //结束并输出计时时长 - myTime

//输出: myTime:123.00 ms
```

## 表格的形式输出数组


```js
console.table(arrayName)
```

## 列出某个元素的所有属性

```js
dir($('selector')) 
```

##获取最后的返回值

```js
2+3+4
9 //- The Answer of the SUM is 9

$_
9 // Gives the last Result

$_ * $_
81  // As the last Result was 9

```
