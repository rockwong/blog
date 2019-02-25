---
tags: [Notebooks/React]
title: React 入门
created: '2019-02-25T14:00:31.026Z'
modified: '2019-02-25T14:02:51.516Z'
---

# React 入门
> 参考 http://www.ruanyifeng.com/blog/2015/03/react 

## ReactDOM.render()

```js
ReactDOM.render(<h1>Hello world</h1>,document.getElementById('demo'));
```

##JSX
以 `<` 开头就用HTML规则解析, 以 `{` 开头就用JavaScript解析

```js
var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);

```

如果这个变量是一个数组，则会展开这个数组的所有成员.


```js
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);

```
## 组件
组件类名称第一个字母必须大写,只能包含一个顶层标签
用法与HTML标签一致,可以加入属性,属性值在组件内用`this.props`获取.

因`class`,`for`是JavaScript的保留字:
`class`->`className`
`for`-> `htmlFor`

```js
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```
###无状态函数


```js
function Button({ color = 'blue', text = 'http://jartto.wang'}) {
	return (
		<button className = {`btn btn-${color}`}>
			<em>{text}</em>
		</button>
	)
}
```
无状态组件只传入 props 和 context 两个参数。也就是说，它不存在 state，也没有生命周期方法，组件本身即上面两种 React 组件构建方法中的 render 方法。不过，像 propType 和 defaultProps 还是可以通过向方法设置静态属性来实现。
组件不能访问 this 对象
###组件计时器

```js
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {secondsElapsed: 0};
  }
  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
}
ReactDOM.render(<Timer />, mountNode);
```
### 纯组件 Pure Component

##this.props.children

`this.props.children` 属性。它表示组件的所有子节点

```js
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);

```

##PropTypes
验证组件实例的属性是否符合要求
`getDefaultProps` 方法可以用来设置组件属性的默认值.

```js
var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },
  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});

```

##获取真实的DOM节点

从组件获取真实 DOM 的节点，要用到 `ref` 属性,然后 `this.refs.[refName]` 就会返回这个真实的 DOM 节点.
React 组件支持很多事件，除了 `Click` 事件以外，还有 `KeyDown` 、`Copy`、`Scroll` 等

```js
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);

```

## this.state
`getInitialState`  方法用于定义初始状态.
`this.state` 属性读取.
`this.setState` 方法就修改状态值，每次修改以后，自动调用 `this.render` 方法，再次渲染组件。
表单的元素值需要定义一个事件的回调函数,通过`event.target.value`读取输入的值.

```js
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);

```

##组件生命周期

组件的生命周期分三个状态:
`Mounting` : 已插入真实 DOM
`Updating` : 正在被重新渲染
`Unmounting` :已移出真实 DOM

每个状态都有两种处理函数,`will` 在进入状态之前调用,`did`在进入状态之后调用.

```		
componentWillMount()
componentDidMount()
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()
```

此外还提供两种特殊状态的处理函数.

```
componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
```


```js
var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  },

  render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
});

ReactDOM.render(
  <Hello name="world"/>,
  document.body
);

```
