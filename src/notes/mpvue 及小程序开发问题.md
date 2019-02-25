---
tags: [Notebooks/Vue]
title: mpvue 及小程序开发问题
created: '2019-02-25T14:14:58.024Z'
modified: '2019-02-25T14:20:28.871Z'
---

# mpvue 及小程序开发问题

微信小程序脚手架遇到的部分问题，及解决方案。

## 主要生命周期

**页面的生命周期**

`onShow` 当小程序从后台进入显示，或者切换导航进入页面后
`onHide` 当小程序从前台台进入后台，或小程序卸载后
`onUnload` 页面卸载，通常页面跳转页面卸载触发。


## 样式问题

1. 布局样式高度100% 无效的问题: `height:100%` -> `height:100vh`
2. 标签加上 `hover-class` 点击后会应用改样式，类似于按钮的伪类 `:actived`, 在组件上添加 `hover-stop-propagation`为 `true` 后， 点击该按钮不会触发父组件的 `hover-class`

## 组件命名

1. 驼峰命名规则 `TopHeader` -> `<top-header />`
2. 组件命名规避微信自带的组件名称，否则会出现无法预料的情况。


# 二维码问题
* 小程序中，不支持长按识别二维码，和小程序码。
* 可利用小程序 图片预览功能识别 小程序码并进行跳转，公众号二维码不能识别
* 利用小程序 web-view 开放功能，在打开页面中显示 图片，进行长按识别，不过安卓一样不识别
* 利用官方二维码生成，小程序二维码 必须将官方的api 加入白名单

## UI 库
1. `WeUI for 小程序 为微信小程序量身设计` https://github.com/Tencent/weui-wxss

2. `基于 mpvue 的 WeUi` 基于 mpvue 框架，重写 WeUI  https://kuangpf.com/mpvue-weui
    *  `button` 组件中的边框圆角样式在伪类 :after 中


3. `富文本显示（参考）` http://www.ifanr.com/minapp/1009197

## 设置计算值的函数不可用Ramda等函数封装


```js

  computed: {
    userInfo: R.always('info') // 应该使用 ()=>'info'
  }),
```


## scss的支持

安装相关依赖，并设置标签`<style>`属性 `lang=scss`


``` bash
npm install sass-loader node-sass --save-dev
```

## 绑定命名空间函数无法使用的问题

 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 无法使用的问题
 
 命名空间辅助代码变得更可读，实际是相当于语法糖，需映射 `this.$store.XXXX`，故在创建store 时增加映射。
 
 
```js
Vue.prototype.$store = store
```


## 资源文件访问方式
图片等相关资源都放入 `static` 下，在页面中用根路径访问。

```
/static/**/*.jpg
```

## data 数据设置

将 `data` 中的字段值设置为 `undefined` 时，该操作不会生效，字段值会保持旧事，不是`undefined`;
 
 
## 引入 vuex module

利用 `require.context` 批量引入 `module` 文件，`namespaced` = pages下子文件夹名称。

当`module`文件放入 `pages` 目录下,并以`module`为前缀命名，则自动引入`vuex modules`中。

```js
// 自动引入 modules 文件
const requireModules = require.context(
  // 其组件目录的相对路径
  '../pages',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /module\w*\.(js)$/
)

const modulesObj = {}
requireModules.keys().forEach(fileName => {
  // 获取组件配置
  const modulesConfig = requireModules(fileName)

  // 获取module 命名
  const moduleName = fileName.replace(/^\.\/(\w*).*$/, '$1')

  // 获取导出的值
  modulesObj[moduleName] = modulesConfig.default || modulesConfig
})
const store = new Vuex.Store({
  modules: modulesObj
})
```

## wx 接口转 promise 


```js
import wxp from 'minapp-api-promise'
```

## 小程序接口获取二维码图片
需要后端支持，正式环境腾讯不容许前端直接调用 生成二维码的接口。

在开发工具中忽略域名可以在前端展示生成并展示二维码

1. 图片展示 `<image src="data:image/png;base64,{{imgUrl}}"/>`
2. 通过 ACCESS_TOKEN 获取图片数据，请求参数添加 `responseType:'arraybuffer'`
3. 获取二维码图片数据成功后 `self.imgUrl=wx.arrayBufferToBase64(res.data)`

## 引用 统一fetch

引入第三方 fetch 并配置 cookie

```js
import Fly from 'flyio/dist/npm/wx'

const fly = new Fly()

// 配置请求基地址
if (process.env.NODE_ENV === 'production') {
  fly.config.baseURL = 'http://test.***.com/api/'
} else {
  fly.config.baseURL = 'http://test.***.com/api/'
}

// 添加请求拦截器
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加cookie
  const cookie = wx.getStorageSync('cookie')
  if (cookie) config.headers.cookie = cookie
  // 可以通过promise.reject／resolve直接中止请求
  // promise.resolve("fake data")
  return config
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    // 将cookie存入storage中
    console.log('response==', response)
    let cookie = response.headers['Set-Cookie'] || response.headers['set-cookie']
    console.log('cookie==', cookie)
    if (cookie) wx.setStorageSync('cookie', cookie.replace(/(?!\s),(?!\s)/, '; '))

    const data = response.data

    // 自定义请求结果，如果status 不为'success',则认为请求失败（后端统一配置）
    if (data.status === 'success') {
      return data
    } else {
      return promise.reject(data)
    }
  },
  (err, promise) => {
    // 发生网络错误后会走到这里
    promise.resolve(err)
  }
)
export default fly

```

## Cannot assign to read only property 'exports' of object '#<Object>' 编译报错

这是因为引用第三方插件的时候,带入了`module.exports`的写法
webpack可以使用require和export ，但是不能混合使用import 和module.exports,
你需要做的是更新根目录下的`.babelrc`文件配置
