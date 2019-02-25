---
tags: [Notebooks/React]
title: dva 教程
created: '2019-02-25T14:00:31.022Z'
modified: '2019-02-25T14:02:51.521Z'
---

# dva 教程

## 结构划分

dva 架构的项目中，目录基本结构为：

```bash
.
├── /mock/           # 数据mock的接口文件
├── /src/            # 项目源码目录
│ ├── /components/   # 项目组件
│ ├── /routes/       # 路由组件（页面维度）
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ ├── index.less     
│ └── index.html     
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置
```

## 设计 Model

### Model 的设计
在抽离了`users`以后，我们来看下如何设计，通常有以下两种方式：

1. 按照数据维度
1. 按照业务维度

#### 数据维度
按照数据维度的 model 设计原则就是抽离数据本身以及相关操作的方法，比如 `users` ：

```javascript
// models/users.js

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
  },
	effects: {
		*query(){},
		*create(){},
		// 因为delete是关键字
		*'delete'(){},
		*update(){},
	},
	reducers: {
		querySuccess(){},
		createSuccess(){},
		deleteSuccess(){},
		updateSuccess(){},
	}
}

```

如果你写过后台代码，你会发现这跟我们常常写的后台接口是很类似的，只关心数据本身，至于在使用 `users` model 的组件中所遇到的状态管理等信息跟 model 无关，而是作为组件自身的state维护。

这种设计方式使得 model 很纯粹，在设计通用数据信息 model 的时候比较适用，比如当前用户登陆信息等数据 model。但是在数据跟业务状态交互比较紧密，数据不是那么独立的时候会有些不那么方便，因为在数据跟业务状态紧密相连的场景下，将状态放到 model 里面维护会使得我们的代码更加清晰可控，而这种方式就是下面将要介绍的 `业务维度` 方式的设计。

#### 业务维度 
按照业务维度的 model 设计，则是将数据以及使用强关联数据的组件中的状态统一抽象成 model 的方法，在本例中，`users` model设计如下：

```javascript
// models/users.js

export default {
  namespace: 'users',

  state: {
    list: [],
	total: null, 
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },
	effects: {
		*query(){},
		*create(){},
		*'delete'(){},
		*update(){},
	},
	reducers: {
		showLoading(){}, // 控制加载状态的 reducer
		showModal(){}, // 控制 Modal 显示状态的 reducer
		hideModal(){},
		querySuccess(){},
		createSuccess(){},
		deleteSuccess(){},
		updateSuccess(){},
	}
}

```

## 组件设计
React 应用是由一个个独立的 Component 组成的，我们在拆分 Component 的过程中要尽量让每个 Component 专注做自己的事。

一般来说，我们的组件有两种设计：

1. Container Component
2. Presentational Component

#### Container Component
Container Component 一般指的是具有`监听数据行为`的组件，一般来说它们的职责是`绑定相关联的 model 数据`，以数据容器的角色包含其它子组件，通常在项目中表现出来的类型为：Layouts、Router Components 以及普通 Containers 组件。

通常的书写形式为：

```javascript
import React, { Component, PropTypes } from 'react';

// dva 的 connect 方法可以将组件和数据关联在一起
import { connect } from 'dva';

// 组件本身
const MyComponent = (props)=>{};
MyComponent.propTypes = {};

// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return {...state.data};
}

// 关联 model
export default connect(mapStateToProps)(MyComponent);
```

#### Presentational Component
Presentational Component 的名称已经说明了它的职责，展示形组件，一般也称作：Dumb Component，它不会关联订阅 model 上的数据，而所需数据的传递则是通过 props 传递到组件内部。

通常的书写形式：

```javascript
import React, { Component, PropTypes } from 'react';

// 组件本身
// 所需要的数据通过 Container Component 通过 props 传递下来
const MyComponent = (props)=>{}
MyComponent.propTypes = {};

// 并不会监听数据
export default MyComponent;
```

#### 对比
对组件分类，主要有两个好处：

1. 让项目的数据处理更加集中；
2. 让组件高内聚低耦合，更加聚焦；

试想如果每个组件都去订阅数据 model，那么一方面组件本身跟 model 耦合太多，另一方面代码过于零散，到处都在操作数据，会带来后期维护的烦恼。
