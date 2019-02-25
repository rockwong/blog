---
tags: [Notebooks/Tools]
title: Webpack 配置说明
created: '2019-02-25T14:39:35.376Z'
modified: '2019-02-25T14:40:46.476Z'
---

# Webpack 配置说明
> 参考:<http://www.cnblogs.com/vajoy/p/4650467.html>

##实例配置

```js
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './src/js/page/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};
```

##entry
页面入口文件配置,支持字符串及数组形式

```js
//string
entry: "./entry1"

//array
entry: ["./entry1", "./entry2"]

//objact
entry: {
        page1: "./page1",
        page2: ["./entry1", "./entry2"]
    },
    output: {
        // Make sure to use [name] or [id] in output.filename
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    }

```
##output
输出配置项(即入口文件最终要生成什么名字的文件、存放到哪里)
[id] 输入文件的序列
[name] 输入对象的key值如: page1,page2
[hash] 文件的hash值
[chunkhash] chunk的文件hash

**chunkFilename**
未被列在entry中，却又需要被打包出来的文件命名配置。

```js
 output: {
        path: "dist/js/page",
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    }

```
##module
是最关键的一块配置,它告知 webpack 每一种文件都需要使用什么加载器来处理
如上，"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
所有的加载器都需要通过 npm 来加载，并建议查阅它们对应的 readme 来看看如何使用。
```js
module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
```
##resolve

```js
resolve: {
        //查找module的话从这里开始查找
        root: 'E:/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
```
##运行参数

```js
$ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包

$ webpack --watch   //监听变动并自动打包

$ webpack -p    //压缩混淆脚本，这个非常非常重要！

$ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
```

##html

```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>demo</title>
</head>
<body>
  <script src="dist/js/page/common.js"></script>
  <script src="dist/js/page/index.js"></script>
</body>
</html>
```

##js
各脚本模块可以直接使用 commonJS 来书写，并可以直接引入未经编译的模块，比如 JSX、sass、coffee等（只要你在 webpack.config.js 里配置好了对应的加载器）。
编译前的页面入口文件（index.js）：

```js
require('../../css/reset.scss'); //加载初始化样式
require('../../css/allComponent.scss'); //加载组件样式
var React = require('react');
var AppWrap = require('../component/AppWrap'); //加载组件
var createRedux = require('redux').createRedux;
var Provider = require('redux/react').Provider;
var stores = require('AppStore');

var redux = createRedux(stores);

var App = React.createClass({
    render: function() {
        return (
            <Provider redux={redux}>
                {function() { return <AppWrap />; }}
            </Provider>
        );
    }
});

React.render(
    <App />, document.body
);
```

##shimming
在 AMD/CMD 中，我们需要对不符合规范的模块（比如一些直接返回全局变量的插件）进行 shim 处理，这时候我们需要使用` exports-loader` 来帮忙：

```js
{ test: require.resolve("./src/js/tool/swipe.js"),  loader: "exports?swipe"}
```
之后在脚本中需要引用该模块的时候，这么简单地来使用就可以了：

```js
require('./tool/swipe.js');
swipe(); 
```
##自定义公共模块提取
在文章开始我们使用了 CommonsChunkPlugin 插件来提取多个页面之间的公共模块，并将该模块打包为 common.js 。
更加个性化一些，可以这样配置：

```js
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        p1: "./page1",
        p2: "./page2",
        p3: "./page3",
        ap1: "./admin/page1",
        ap2: "./admin/page2"
    },
    output: {
        filename: "[name].js"
    },
    plugins: [
        new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"]),
        new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
    ]
};
// <script>s required:
// page1.html: commons.js, p1.js
// page2.html: commons.js, p2.js
// page3.html: p3.js
// admin-page1.html: commons.js, admin-commons.js, ap1.js
// admin-page2.html: commons.js, admin-commons.js, ap2.js
```

##独立打包样式文件
有时候可能希望项目的样式能不要被打包到脚本中，而是独立出来作为.css，然后在页面中以<link>标签引入。这时候我们需要 `extract-text-webpack-plugin` 来帮忙：

```js
var webpack = require('webpack');
    var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
    var ExtractTextPlugin = require("extract-text-webpack-plugin");

    module.exports = {
        plugins: [commonsPlugin, new ExtractTextPlugin("[name].css")],
        entry: {
        //...省略其它配置
```

##使用CDN/远程文件
有时候我们希望某些模块走CDN并以`<script>`的形式挂载到页面上来加载，但又希望能在 webpack 的模块中使用上。
这时候我们可以在配置文件里使用 externals 属性来帮忙：
需要留意的是，得确保 CDN 文件必须在 webpack 打包文件引入之前先引入。

```js
{
    externals: {
        // require("jquery") 是引用自外部模块的
        // 对应全局变量 jQuery
        "jquery": "jQuery"
    }
}
```
