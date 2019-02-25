---
tags: [Notebooks/Javascript]
title: 如何判断Javascript对象是否存在
created: '2019-02-25T14:15:27.034Z'
modified: '2019-02-25T14:18:17.493Z'
---

# 如何判断Javascript对象是否存在

## 使用typeof运算符
 
 ``` js
 
 if (typeof myObj == "undefined") {
　　　　var myObj = { };
　　}
　　
 ```
##  判断对象的属性是否存在

```js

if (!('myObj' in window)) {
　　　　window.myObj = { };
　　}
　　
```

## hasOwnProperty方法,判断myObj是否为顶层对象的一个属性

> in 和 hasOwnProperty 都可以判断对象的属性是否存在。但是hasOwnProperty在IE8及以下判断DOM对象会出错

```js
if (!this.hasOwnProperty('myObj')) {
　　　　this.myObj = { };
　　}
```
