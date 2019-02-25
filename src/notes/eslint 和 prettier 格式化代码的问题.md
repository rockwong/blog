---
tags: [Notebooks/Tools]
title: eslint 和 prettier 格式化代码的问题
created: '2019-02-25T14:39:35.367Z'
modified: '2019-02-25T14:40:46.485Z'
---

# eslint 和 prettier 格式化代码的问题

`eslint` 负责代码规则校验，`prettier` 调整代码风格


## 解决办法

* 使用 `editorconfig` 协助兼容开发工具的代码格式化
* 使用 `eslint` 检查代码
* 使用 `prettier` 格式化代码

## 操作步骤

1. 安装 eslint 和 prettier （node 模块）
2. 安装 eslint 和 prettier （ ide 编辑器的插件 ，webstorm 2018.1后自带）
3. 配置 eslint 和 prettier
4. 配置 editorconfig （可选）

### 安装 eslint 和 prettier （node 模块）


``` bash
# 这里需要全局安装最主要的两个node 模块，主要是要让 ide 编辑器能够读取全局环境来调用这2个模块
npm install eslint prettier -g --save-dev

# 这个是为了 eslint 跟 prettier 可以联合使用
npm install --save-dev eslint-plugin-prettier
# 这个是为了让 eslint 跟 prettier 兼容，关闭 prettier 跟 eslint 冲突的rules
npm install --save-dev eslint-config-prettier

# 可选的部分插件
npm -g install babel-eslint eslint-plugin-html --save-dev
```

`eslint-config-prettier` 

这个插件是如果 eslint 的规则和 prettier 的规则发生冲突的时候（主要是不必要的冲突），例如 eslint 限制了必须单引号，prettier 也限制了必须单引号，那么如果用 eslint 驱动 prettier 来做代码检查的话，就会提示 2 种报错，虽然他们都指向同一种代码错误，这个时候就会由这个插件来关闭掉额外的报错。

官方详细介绍：GitHub - prettier/eslint-config-prettier: Turns off all rules that are unnecessary or might conflict with Prettier.


`babel-eslint `

有些代码是没被 eslint 支持的（因为 babel 也是负责这种事情，转译不被支持的 js 语法），所以需要加上这个插件来保持兼容性。

`eslint-plugin-htm`

为了让 eslint 可以检查.vue文件的代码。

### 设置模块

在 webstorm 的 setting 中搜索 prettier 并添加 对应的模块路径。


## 配置 eslint 插件和 prettier 插件

**eslint 的配置**

`eslint` 的检查规则是通过配置文件`.eslintrc` 实现的
> https://github.com/AlloyTeam/eslint-config-alloy

`.eslintrc` 配置文件需要添加修改地方，主要是为了 `prettier` 插件和 `eslint-config-prettier` 插件和 `eslint-plugin-prettier` 插件使用的：


```js
// 因为使用了 eslint 和 prettier，所以要加上他们
extends: [ 'eslint:recommended', 'plugin:prettier/recommended'],

// required to lint *.vue files 使用 html参数
plugins: ['html', 'prettier'],

// rules 规则就按照各家写法。
```

**prettier 的配置**

prettier 的检查规则是通过配置文件`.prettierrc` 实现的，不过一般来说，只需要配置少部分规则即可

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": true
}

```

有可能会出现的情况是，prettier 格式化后，全部加了分号，但是 eslint 又要去掉分号，那么就会重复了，这里可以简单地设置 prettier 的分号设置跟 eslint 保持一致，其他如此类推，但只适用在几个比较特别的地方

**配置 editorconfig**

```
// 放在项目根目录的.editorconfig文件
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

```

## webstorm 中的快捷设置

利用webstorm中的 macro 功能，将保存替换为，`保存`并使用`Prettier`格式化代码。

1. `Edit`-> `Marcos` -> `Start Macro Recording"`
2. `右键` -> `Reformat with Prettier` -> `File` -> `Save All`
3. `Edit`-> `Marcos` -> `Stop Macro Recording"` -> `Set macro name`
4. `File` -> `Setting` -> `Keymap`-> ` select macro`-> ` Set key is "command + s"`

## 美化项目文件


```bash
prettier --write "**/*.js"
```




> 参考 [地址](https://www.godblessyuan.com/2018/06/%E6%9B%B4%E6%96%B0%E7%89%88-%E6%A2%B3%E7%90%86%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E4%BD%BF%E7%94%A8eslint%E5%92%8Cprettier%E6%9D%A5%E6%A3%80%E6%9F%A5%E5%92%8C%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%BB%A3%E7%A0%81%E9%97%AE%E9%A2%98.html)
