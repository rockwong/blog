---
tags: [Notebooks/React]
title: antd-antd-mobile 国际化方案
created: '2019-02-25T14:00:31.020Z'
modified: '2019-02-25T14:02:51.521Z'
---

# antd/antd-mobile 国际化方案

>参考自 antd 国际化方案 https://github.com/ant-design/intl-example

## 前端国际化详解、举例

国际化的核心步骤有两步：

1. 创建资源文件，以 key-value 方式存储
2. 加载资源文件，将页面上 key 的内容替换为相关 value

在这里我们重点看下如何将页面上的 "key" 替换为相关 "value"。
首先，我需要跟大家介绍一个类库 [React Intl](https://github.com/yahoo/react-intl)，我们的国际化方案主要是基于它展开的。
React Intl 是由 yahoo 开发的，针对 React 的国际化类库，基于 Format.js，支持语言、时间、货币等等国际化。

### React Intl 国际化步骤

1. 判断是否需要引入 polyfill 文件
2. 引入 react-intl 的 local data
3. 创建 react-intl 国际化上下文组件
4. 使用 react-intl's components & apis，进行国际化开发

#### polyfill

> React Intl uses and builds on the Internationalization API built-in to JavaScript.

如官方文档提到的那样，JavaScript 有一套国际化标准 API，React Intl 也是基于它的，但是由于 Safari 或者一些旧版本的浏览器不支持，于是我们需要在这些浏览器下引入 polyfill 文件（方式有很多种，参见官方文档）：

```html
<!-- index.html -->
<script>
  // 我们这里采用的做法是直接判断 window.Intl 是否存在，从而确定是否要引入 polyfill 文件
  // 下面的 cdn 地址大家可以修改成本地资源文件，或者参考官方文档其他引入方式
  if (!window.Intl) {
    document.writeln('<script src="https://as.alipayobjects.com/g/component/intl/1.0.1/Intl.js">' + '<' + '/script>');
    document.writeln('<script src="https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/en.js">' + '<' + '/script>');
  }
</script>
```

#### 引入 react-intl 的 local data

```javascript
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
addLocaleData(en);
```

react-intl 在做国际化的时候需要一些特有的 local data，主要是进行相对时间翻译时，比如昨天、今天、明天、几分钟前、几个月前之类的。
我们通过 `addLocaleData` 这个方法加载相关内容，大家可以根据实际情况加载需要的 locale-data。

#### 创建 react-intl 国际化上下文组件

为了能够使用 react-intl 进行国际化，跟 redux 这些框架一样，我们需要一个 Provider Component，用它来提供国际化的上下文，具体用法：

```html
ReactDOM.render(
  <IntlProvider
    locale={appLocale.locale}
    messages={appLocale.messages}
    formats={appLocale.formats}
  >
    <Provider store={store}>
      <Routes history={window.appHistory} />
    </Provider>
  </IntlProvider>,
  document.getElementById('__react-content')
);
```


### 国际化资源文件内容
目前我们管理资源文件的方式是在 /locales 文件夹下(当然，你放在哪里都可以)：

```
.
├── en.json
├── zh.json
```

\*.json 是我们的资源文件，返回的是一个对象，key 为我们翻译用的 id，value 为具体语言的翻译，内容是：

```json
{
  "sendVerifyCode": "Resend verify code after {count} seconds",
  "resendVerifyCode": "Resend",
  "page404.message": "Not Found",
  "page404.return home": "Return To Home",
  "page500.message": "Server error, please try again."
}
```

### 需要安装的插件

``` bash
npm install react-intl --save

npm install atool-l10n babel-plugin-react-intl --save-dev
```

`react-intl` 国际化组件包

`babel-plugin-react-intl` 语言包文字提取根据

在webpack中的基本配置如下：


```js
  
  // 将语言包文件打包放到指定目录
  webpackConfig.babel.plugins.push([
    'react-intl', {
      messagesDir: './i18n-messages',
    },
  ]);
```

`atool-l10n`  国际化语言资源自动生成

示例配置

```js
// ./l10n.config.js
module.exports = {
  "middlewares": {
    "summary": [
      "summary?sourcePattern=i18n-messages/**/*.json"
    ],
    "process": [
      "fetchLocal?source=locales,skip",
      "metaToResult?from=defaultMessage,to=zh",
      "youdao?apiname=iamatestmanx,apikey=2137553564",
      "reduce?-autoPick,autoReduce[]=local,autoReduce[]=meta"
    ],
    "emit": [
      "save?dest=locales"
    ]
  }
}
```

 具体配置可参考： https://github.com/ant-tool/atool-l10n
 
 
 在 ` package.json` script 中加入 `"trans": "atool-l10n"` 
 
 进入开发模式，一般脚手架脚本 `npm start`，并执行 npm run trans 
 
 具体生成过程如下：

* 自动生成 zh.json，将所有的 defaultMessage 作为中文翻译 value
* 自动生成 en.json，默认 value 通过翻译api 获取值，如果 value 你修改过，那  merge 的时候会保留用户修改的值
* 如果你删除了部分国际化代码，执行脚本后，相关的 key-value 会从所有的 json 中删除
* 翻译后的首字母可能存在大小写的问题，可以用正则查找替换， 查`: "(\w)` 替换 `: "\u$1`



### 国际化组件

下面组件相当于重构了antd 国际化组件 [LocaleProvider](https://ant.design/docs/react/i18n-cn)。 
如果不使用用antd ,去掉组件中的antd 文件即可。
网站语言切换方式，在redux中 `global.locale`控制，目前只有中英文，其它语言自行添加


```js
import React from 'react';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeDataZh from 'react-intl/locale-data/zh';
import localeDataEn from 'react-intl/locale-data/en';
import enUs from 'antd/lib/locale-provider/en_US';
import zhCn from 'antd/lib/locale-provider/zh_CN';

// 业务语言文件
import zhMessages from '../../../locales/zh.json';
import enMessages from '../../../locales/en.json';

const localeDate = {
  zh: { messages: { ...zhMessages }, data: localeDataZh, locale: 'zh', antd: zhCn },
  en: { messages: { ...enMessages }, data: localeDataEn, locale: 'en', antd: enUs },
};
const cache = {};
const onceAddLocaleData = type => cache[type] || (cache[type] = addLocaleData(localeDate[type].data));

function mapStateToProps(state) {
  const locale = state.global.locale || 'en'; // 选择语言默认用英文
  onceAddLocaleData(locale); // 加载react-intl 核心语言文件
  return { messages: localeDate[locale].messages, locale: localeDate[locale].locale };
}

const I18nWithAntd = props => {
  return (
    <IntlProvider {...props}>
      <LocaleProvider locale={localeDate[props.locale].antd}>
        {props.children}
      </LocaleProvider>
    </IntlProvider>
  );
};
export default connect(mapStateToProps)(I18nWithAntd);

```
