---
tags: [Notebooks/Vue]
title: vue + typescript 采坑
created: '2019-02-25T14:14:58.025Z'
modified: '2019-02-25T14:20:28.872Z'
---

# vue + typescript 采坑

> 参考： https://juejin.im/post/5b54886ce51d45198f5c75d7

## require.context 报错

`Property 'context' does not exist on type 'NodeRequire'.`

```bash
# 安装ts types
npm install --save-dev @types/webpack-env
```

tsconfig.json 配置
```json
{
  "compilerOptions": {
      "types": ["node", "webpack-env"]
      }
  }
```

`webpack_require__(...).context is not a function` 

检查参数错误，`context`的参数必须为字面量

## import alias 

`tsconfig.json` 和 `webpack` 中的 `alias`都需要设置，否则会出现部分问题，
 `webstorm`中右键 `src`目录 Mark directory as Resource root,解决编辑器识别路径的问题。

* 解决 `webstorm`  import 时的路径自动完成，并根据项目目录文件自动提示
* 解决`typescript`报引用路径错误问题
* 解决编译报错问题 `compile with errors: This dependency was not found`
* 点击 `improt` 方法自动打开文件定位到其位置,方便调试
* 在项目路径嵌套过深下引入 `src/services` 中的文件非常方便，省去冗余的相对路径'../../../'

```js
// 在根目录中的 vue.config.js
var path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        services: path.resolve(__dirname, "src/services")
      }
    }
  }
};
```


 `tsconfig.json` 中的路径配置
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "services/*": ["src/services/*"],
      "@/*": ["src/*"]
    }
  }
}

```

## vuex

1. 添加`modules`时开启 `namespaced=true`
2. 利用`vuex-class` 里用 namespace 修饰器 快捷访问vuex 中的modues 状态


```js
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
@Component
const about = namespace("about");
export default class Home extends Vue {
  @about.State
  message: string;
}
```

## vue-class-component


`不要使用箭头函数方法访问 this ,无法正常工作`

react 中有插件绑定this,所以正常工作，vue中目前不行
```js
@Component
class MyComp extends Vue {
  foo = 123

  bar = () => {
    // Does not update the expected property.
    // `this` value is not a Vue instance in fact.
    this.foo = 456
  }
}
```

`undefined` 不响应数据变化

```js
@Component
class MyComp extends Vue {
  // Will not be reactive
  foo = undefined

  // Will be reactive
  bar = null

  data () {
    return {
      // Will be reactive
      baz: undefined
    }
  }
}
```
