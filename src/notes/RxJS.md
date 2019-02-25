---
tags: [Notebooks/Javascript]
title: RxJS
created: '2019-02-25T14:15:27.044Z'
modified: '2019-02-25T14:18:17.503Z'
---

# RxJS

> 参考： http://www.alloyteam.com/2016/12/learn-rxjs/

### 什么是RxJS
RxJS 是 Reactive Extensions for JavaScript 的缩写，起源于 Reactive Extensions，是一个基于可观测数据`流`在异步编程应用中的库。

`流`是在时间流逝的过程中产生的一系列事件。它具有时间与事件响应的概念。

### 观察者模式
观察者模式在 Web 中最常见的应该是 DOM 事件的监听和触发。

```订阅```：通过 addEventListener 订阅 document.body 的 click 事件。

```发布```：当 body 节点被点击时，body 节点便会向订阅者发布这个消息。


```js
document.body.addEventListener('click', function listener(e) {
    console.log(e);
},false);
 
document.body.click(); // 模拟用户点击
```

### 迭代器模式
迭代器模式可以用 JavaScript 提供了 Iterable Protocol 可迭代协议来表示。Iterable Protocol 不是具体的变量类型，而是一种可实现协议。JavaScript 中像 Array、Set 等都属于内置的可迭代类型，可以通过 iterator 方法来获取一个迭代对象，调用迭代对象的 next 方法将获取一个元素对象，如下示例。


```js
var iterable = [1, 2];
 
var iterator = iterable[Symbol.iterator]();
 
iterator.next(); // => { value: "1", done: false}
iterator.next(); // => { value: "2", done: false}
 
iterator.next(); // => { value: undefined, done: true}
```

### RxJS 的观察者 + 迭代器模式

RxJS 中含有两个基本概念：Observables 与 Observer。Observables 作为被观察者，是一个值或事件的流集合；而 Observer 则作为观察者，根据 Observables 进行处理。
Observables 与 Observer 之间的订阅发布关系(观察者模式) 如下：

`订阅`：Observer 通过 Observable 提供的 subscribe() 方法订阅 Observable。

`发布`：Observable 通过回调 next 方法向 Observer 发布事件。

下面为 Observable 与 Observer 的伪代码

```js

// Observer
var Observer = {
    next(value) {
        alert(`收到${value}`);
    }
};
 
// Observable
function Observable (Observer) {
    setTimeout(()=>{
        Observer.next('A');
    },1000)
}
 
// subscribe
Observable(Observer);

```
