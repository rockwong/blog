---
tags: [Notebooks/Vue]
title: 脚手架工具 vue-cli
created: '2019-02-25T14:14:58.022Z'
modified: '2019-02-25T14:20:28.869Z'
---

# 脚手架工具 vue-cli

## 参数说明

一. 功能选择

 ◉ `Babel`  js 低版本语言转换，建议勾选  
 ◉ `TypeScript` Ts 支持，根据需要勾选
 ◉ `Progressive Web App (PWA) Support` 利用 Service Worker 提升用户体验
 ◉ `Router` vue 官方路由，用作页面跳转
 ◉ `Vuex` 数据管理，类似Redux
 ◉ `CSS Pre-processors` scss postcss的支持
 ◉ `Linter / Formatter` 使用代码格式规范
 ◯ `Unit Testing` 测试方法
 ◉ `E2E Testing ` 测试方法
 
 二.  class-style component 以 class的方式写 vue的组件
 
 1. `methods`，钩子都可以直接写作`class`的方法
 2. `computed`属性可以直接通过`get`来获得
 3. 初始化`data`可以声明为`class`的属性
 4. 其他的都可以放到`Component`装饰器里
 
```ts
import Vue from 'vue'
import Component from 'vue-class-component'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  // 所有的组件选项都可以放在这里
  template: '<button @click="onClick">Click!</button>'
})
export default class MyComponent extends Vue {
  // 初始数据可以直接声明为实例的属性
  message: string = 'Hello!'

  // 组件方法也可以直接声明为实例的方法
  onClick (): void {
    window.alert(this.message)
  }
}
```

三 . Use Babel alongside TypeScript for auto-detected polyfills? -> 是否用babel做转义

四. Use history mode for router -> 路由是否用 `history` 模式，或者 `hash` 模式。

五. Pick a CSS pre-processor  ->  css 的预编译选择 `scss/sass`

六. 格式化语言选择 `ESLint + Prettier`
 
七. 选择 `E2E testing solution` -> 选择测试方案 `Nightwatch (Selenium-based)` vue 测试框架
