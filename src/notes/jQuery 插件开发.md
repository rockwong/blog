---
tags: [Notebooks/Javascript]
title: jQuery 插件开发
created: '2019-02-25T14:15:27.041Z'
modified: '2019-02-25T14:18:17.500Z'
---

# jQuery 插件开发

##  通过$.extend()来扩展jQuery


```js
$.extend({
    sayHello: function(name) {
        console.log('Hello,' + (name ? name : 'Dude') + '!');
    }
})
$.sayHello(); //调用
$.sayHello('Wayou'); //带参调用

```
