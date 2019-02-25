---
tags: [Notebooks/Tools]
title: Webpack入门实例
created: '2019-02-25T14:39:35.377Z'
modified: '2019-02-25T14:40:46.474Z'
---

# Webpack入门实例

##安装 webpack,webpack-dev-server
用npm全局安装 **webpack**,**webpack-dev-server**

```bash
npm install webpack -g
npm install webpack-dev-server -g
```

##输出JS示例
* 创建一个workflow目录
* 新建一个src文件夹,新增一个index.js

```js
// index.js
document.write('Webpack test');
```
* 根目录新增一个index.html

```html
<!--index.html-->
<html>
<head>
    <meta charset = "utd-8">
</head>
<body>
    <script type="text/javascript" src="dist/main.js"></script>
</body>
</html>
```
* 在根目录下执行:

```bash
webpack src/index.js dist/main.js
```
* 打开inde.html 输出

```
Webpack test
```
* 在src目录新增 content.js

```js
// content.js
module.exports = " It works from content.js !";
```
* 在index.js中新增一行

```js
//index.js
document.write('Webpack test');
document.write(require("./content.js"));
```
* 再次运行命令

```bash
webpack src/index.js dist/main.js
```
* 刷新index.html 输出

```
Webpack test It works from content.js !
```

##loaders
本地安装`css-loader`,`style-loader`

```bash
npm install css-loader style-loader
```
*在src目录下新增style.css

```css
 body{
 	background:red;
 }
```
* 在index.js中新增一行

```js
//index.js
document.write('Webpack test');
document.write(require("./content.js"));
require("!style!css./style.css");
```
* 再次运行命令

```bash
webpack src/index.js dist/main.js
```
* 打开index.html 背景变成红色.

##配置文件 webpack.config.js
在根目录下添加`webpack.config.js`

```js
//webpack.config.js
const config= {
    entry: "./src/index.js",
    output: {
        path: './dist',
        filename: "main.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    }
}
module.exports=config
```
## webpack --watch

```bash
webpack --watch
```
修改资源文件后将会自动编译

##webpack-dev-server

```bash
webpack-dev-server
```
运行后将express服务器绑定到8080端口,
通过访问: **localhost:8080/webpack-dev-server/main**,
每次修改内容后浏览器会自动更新,URL尾部的`main`为webpack.config.js中的output.filename.
