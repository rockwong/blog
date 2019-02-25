---
tags: [Notebooks/React]
title: React 最佳实践
created: '2019-02-25T14:00:31.028Z'
modified: '2019-02-25T14:02:51.516Z'
---

#React 最佳实践

> 参考 https://segmentfault.com/a/1190000011434694

## 优化propTypes

babel-react-optimize 可以在发布到产品环境下，自动去掉propTypes的代码。

## 数据显示

筛选及请求更新数据放入fetch或者dispath then中

## 展示与容器组件 Presentational & Container

**Bad Simple**

```jsx

class CommentList extends React.Component {
  this.state = { comments: [] };

  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }
  render() {
    return (
      <ul>
        {this.state.comments.map(c => (
          <li>{c.body}—{c.author}</li>
        ))}
      </ul>
    );
  }
}
```

数据抓取和数据展示同放在同一个组件和代码块中,数据抓取部分逻辑和数据展示逻辑都无法复用。把数据逻辑部分分离出来成为独立的组件，这类组件就是Container Components，而展现部分组件则是Presentational Components。

**Presentational Components:**


```js
const CommentList = props =>
  <ul>
    {props.comments.map(c => (
      <li>{c.body}—{c.author}</li>
    ))}
  </ul>

```

**Container Components:**


```js

class CommentListContainer extends React.Component {
  state = { comments: [] };
  componentDidMount() {
    fetchSomeComments(comments =>
      this.setState({ comments: comments }));
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```


## 有状态与无状态组件 Stateful & Stateless

**有状态组件**

意思是这个组件能够获取储存改变应用或组件本身的状态数据，在React当中也就是state，一些比较明显的特征是我们可以在这样的组件当中看到对this.state的初始化，或this.setState方法的调用等等。

```js
//Stateful Component
class StatefulLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }
  handleClick() {
    this.setState({
      active: !this.state.active
    })
  }
  render() {
    return <a 
          style={{ color: this.state.active ? 'red' : 'black' }}
          onClick={this.handleClick.bind(this)}
         >
           Stateful Link
         </a>
  }
}
```

**无状态组件**

这样的组件一般只接收来自其他组件的数据。一般这样的组件中只能看到对this.props的调用，通常可以用函数定义组件的方式声明。它本身不会掌握应用的状态数据，即使触发事件，也是通过事件处理函数传递到其他有状态组件当中再对state进行操作。


```js
/ Stateless Component
class StatelessLink extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick() {
    this.props.handleClick(this.props.router)
  }
  render() {
    const active = this.props.activeRouter === this.props.router
    return (
        <li>
            <a 
              style={{ color: active ? 'red' : 'black' }}
              onClick={this.handleClick.bind(this)}
             >
                Stateless Link
            </a>
    </li>
    )
  }
}

class Nav extends React.Component {
  constructor() {
    super()
    this.state={activeRouter: 'home'}
  }
  handleSwitch(router) {
    this.setState({activeRouter: router})
  }
  render() {
    return (
    <ul>
        <StatelessLink activeRouter={this.state.activeRouter} router='home' handleClick={this.handleSwitch.bind(this)} />
        <StatelessLink activeRouter={this.state.activeRouter} router='blog' handleClick={this.handleSwitch.bind(this)} />
        <StatelessLink activeRouter={this.state.activeRouter} router='about' handleClick={this.handleSwitch.bind(this)} />
    </ul>
    )
  }
}
```
