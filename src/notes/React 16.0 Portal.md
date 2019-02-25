---
tags: [Notebooks/React]
title: React 16.0 Portal
created: '2019-02-25T14:00:31.025Z'
modified: '2019-02-25T14:02:51.512Z'
---

# React 16.0 Portal

> 来自 https://zhuanlan.zhihu.com/p/29880992

## 什么是Portal

在React中render到一个组件里面去，实际改变的是网页上另一处的DOM结构,类似传送门的效果。


## Portal的应用
**React v15对话框组件Dialog的实现**


```js
import React from 'react';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} 
  from 'react-dom';

class Dialog extends React.Component {
  render() {
    return null;
  }

  componentDidMount() {
    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);

    this.renderPortal(this.props);
  }

  componentDidUpdate() {
    this.renderPortal(this.props);
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.node);
    window.document.body.removeChild(this.node);
  }

  renderPortal(props) {
    unstable_renderSubtreeIntoContainer(
      this, //代表当前组件
      <div class="dialog">
        {props.children}
      </div>, // 塞进传送门的JSX
      this.node // 传送门另一端的DOM node
    );
  }
}

```


**React v16的Portal支持**


```js

import React from 'react';
import {createPortal} from 'react-dom';

class Dialog extends React.Component {
  constructor() {
    super(...arguments);

    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);
  }

  render() {
    return createPortal(
      <div class="dialog">
        {this.props.children}
      </div>, //塞进传送门的JSX
      this.node //传送门的另一端DOM node
    );
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }
}
```
