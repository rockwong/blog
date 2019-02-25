---
tags: [Notebooks/Vue]
title: Vue 基础用法
created: '2019-02-25T14:14:58.026Z'
modified: '2019-02-25T14:20:28.872Z'
---

# Vue 基础用法

整理和组织官方的文档，方便理解。

## 缩写

### v-bind 缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

### v-on 缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```


## 计算属性和侦听器

**属性**
声明计算属性 `reversedMessage`。用提供的函数将用作属性 `vm.reversedMessage` 的 `getter` 函数.
`vm.reversedMessage` 依赖于 `vm.message`，因此当 `vm.message` 发生改变时，所有依赖 `vm.reversedMessage`的绑定也会更新

**方法**
声明方法 `reversedMessageMethods`。

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p> <!-- 计算属性 -->
  <p>Methods reversed message: "{{ reversedMessageMethods() }}"</p> <!-- 方法 -->
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  methods: {
  reversedMessageMethods: function () {
    return this.message.split('').reverse().join('')
  }
}
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

## 声明周期

![](media/15317260783929/15456467357165.png)
