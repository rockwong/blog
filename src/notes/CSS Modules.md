---
tags: [Notebooks/React]
title: CSS Modules
created: '2019-02-25T14:00:31.022Z'
modified: '2019-02-25T14:02:34.245Z'
---

# CSS Modules


##局部作用域
**app.js**

```js
import React from 'react';
import style from './App.css';

export default () => {
  return (
    <h1 className={style.title}>
      Hello World
    </h1>
  );

```

**app.css**

```css
.title {
  color: red;
}
```

**编译后**
`style.title`会编译成一个哈希字符串

```html
<h1 class="_3zyde4l1yATCOkgn-DBWEL">
  Hello World
</h1>
```
**app.css**也会同时被编译

```css
._3zyde4l1yATCOkgn-DBWEL {
  color: red;
}
```
这样一来，这个类名就变成独一无二了，只对App组件有效。

 ##全局作用域
 `:global(.className)` 声明的`class`，都不会被编译成哈希字符串。
 
```css
.title {
  color: red;
}

:global(.title) {
  color: green;
}
```

##定制哈希类名
`css-loader`默认的哈希算法是`[hash:base64]`，这会将`.title`编译成`._3zyde4l1yATCOkgn-DBWEL`这样的字符串。

```js
 loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
```
`.title` 会编译成 `demo03-components-App---title---GpMto`

## Class 的组合
在`App.css`中，让`.title`继承`.className`。

```css
.className {
  background-color: blue;
}

.title {
  composes: className;
  color: red;
}

```
`App.js`不用修改。

**编译后 app.css**

```css
._2DHwuiHWMnKTOYG45T0x34 {
  color: red;
}

._10B-buq6_BEOTOl9urIjf8 {
  background-color: blue;
}
```
`h1`的`class`编译成

```html
<h1 class="_2DHwuiHWMnKTOYG45T0x34 _10B-buq6_BEOTOl9urIjf8">
```

##输入其他模块
选择器也可以继承其他CSS文件里面的规则。
**another.css**

```css
.className {
  background-color: blue;
}
```
**App.css**可以继承**another.css**里面的规则。


```css
.title {
  composes: className from './another.css';
  color: red;
}
```
**h1**会被解析成

```html
<h1 class="_1lZdo9TWyz5xJXQ_E_wxKY dMzNGHaIQlEoq_oi9XUMx">
```
##输入变量
CSS Modules 支持使用变量，不过需要安装 `PostCSS` 和 `postcss-modules-values`。
`$ npm install --save postcss-loader postcss-modules-values`
**webpack.config.js**

```js
var values = require('postcss-modules-values');

module.exports = {
  entry: __dirname + '/index.js',
  output: {
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules!postcss-loader"
      },
    ]
  },
  postcss: [
    values
  ]
};

```
在`colors.css`里面定义变量

```css
@value blue: #0c77f8;
@value red: #ff0000;
@value green: #aaf200;
```
`App.css`可以引用这些变量

```css
@value colors: "./colors.css";
@value blue, red, green from colors;

.title {
  color: red;
  background-color: blue;
}
```
