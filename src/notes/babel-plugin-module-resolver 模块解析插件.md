---
tags: [Notebooks/HTML-CSS]
title: babel-plugin-module-resolver 模块解析插件
created: '2019-02-25T14:16:31.314Z'
modified: '2019-02-25T14:29:04.524Z'
---

# babel-plugin-module-resolver 模块解析插件

`babel-plugin-module-resolver` 是一个Babel模块解析插件, 在`.babelrc`中可以配置模块的导入搜索路径. 为模块添加一个新的解析器。这个插件允许你添加新的“根”目录，这些目录包含你的模块。它还允许您设置一个自定义别名目录，具体的文件，甚至其他NPM模块。


## 使用方法

```bash
npm install --save-dev babel-plugin-module-resolver 
```

配置 ` .bablerc `

```js
{
  "plugins": [
    ["module-resolver", {
      "root": ["./"],
      "alias": {
         "components":"./src/components",
         "utils":"./src/utils",
      }
    }]
  ]
}
```

	
## 示例


```js
//import Mp from '../../components/MyComponent'; 
import Mp from 'components/MyComponent' 

import MyUtilFn from 'utils/MyUtilFn'; 
//import MyUtilFn from '../../../../utils/MyUtilFn'; 
```
	

## 选项

`root`：一个字符串或根目录的数组。指定路径或全局路径（例如./src/**/components）

`alias`：别名的配置。也可以别名node_modules依赖关系，而不仅仅是本地文件

`extensions`：解析器中使用的扩展数组。覆盖默认扩展名（['.js', '.jsx', '.es', '.es6', '.mjs']）。

`cwd`：默认情况下，工作目录是用于解析器的工作目录，但是您可以覆盖您的项目。
自定义值`babelrc`将使插件根据要解析的文件查找最接近的babelrc配置。
自定义值`packagejson`将使插件查找最接近package.json的文件解析。

`transformFunctions`：将会变换其第一个参数的函数和方法的数组。默认情况下，这些方法是：require，require.resolve，System.import，jest.genMockFromModule，jest.mock，jest.unmock，jest.doMock，jest.dontMock。

`resolvePath(sourcePath, currentFile, opts)`：为文件中的每个路径调用的函数。默认情况下，模块解析器使用一个内部函数，如下所示：import { resolvePath } from 'babel-plugin-module-resolver'。该opts参数是通过babel配置通过选
择对象。

## Webstorm 中使用

需要将资源目录设置成 `Resource Root`,否则可能造成编辑器无法识别引用，造成无法快捷跳转到指定的组建。

设置方法：`右键目录` -> `Mark Directory as` -> `Resource Root`

## ReactNative中使用

让packager正确解决各平台的模块，必须添加 `ios.js` 或 `android.js`扩展：

```js
{
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "extensions": [".js", ".ios.js", ".android.js"]
      }
    ]
  ]
}

```
