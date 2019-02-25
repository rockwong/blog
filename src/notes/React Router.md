---
tags: [Notebooks/React]
title: React Router
created: '2019-02-25T14:00:31.029Z'
modified: '2019-02-25T14:02:51.514Z'
---

# React Router

##基本用法
**安装**
`npm install -S react-router`

使用时,路由器`Router`就是React的一个组件

```js
import { Router } from 'react-router';
render(<Router/>, document.getElementById('app'));
```
真正的路由要通过`Route`组件定义。

```js
import { Router, Route, hashHistory } from 'react-router';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'));

```
用户访问根路由`/` ,组件`app`就会加载到`document.getElementById('app')`

##嵌套路由
`Route` 组件可以嵌套

```js
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>


```
上面代码中，用户访问`/repos`时，会先加载`App`组件，然后在它的内部再加载`Repos`组件。

`App` 组件要写成下面样子

```js
export default React.createClass({
  render() {
    return <div>
      {this.props.children}
    </div>
  }
})
```
路由也可以不写在`Router`组件里面，单独传入`Router`组件的`routes`属性。

```js
let routes = <Route path="/" component={App}>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Route>;

<Router routes={routes} history={browserHistory}/>
```


```js
const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'about', component: About },
    { path: 'inbox', component: Inbox },
  ]
}
```

##动态路由


```js
const CourseRoute = {
  path: 'course/:courseId',

  getChildRoutes(location, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./routes/Announcements'),
        require('./routes/Assignments'),
        require('./routes/Grades'),
      ])
    })
  },

  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, require('./components/Index'))
    })
  },

  getComponents(location, callback) {
    require.ensure([], function (require) {
      callback(null, require('./components/Course'))
    })
  }
}
```
##path 属性
`Route`组件的`path`属性指定路由的匹配规则。这个属性是可以省略的，这样的话，不管路径是否匹配，总是会加载指定组件。

`path`属性可以使用通配符。

```
（1）:paramName
:paramName匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出。
（2）()
()表示URL的这个部分是可选的。
（3）*
*匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
（4） **
** 匹配任意字符，直到下一个/、?、#为止。匹配方式是贪婪模式。

```
`path`属性也可以使用相对路径（不以`/`开头），匹配时就会相对于父组件的路径,也可以使用绝对路由

路由匹配规则是从上到下执行，一旦发现匹配，就不再其余的规则了。

```js
<Route path="/comments" ... />
<Route path="/comments" ... />
```
上面代码中，路径/comments同时匹配两个规则，第二个规则不会生效。

**设置路径参数时，需要特别小心这一点。**


```js
<Router>
  <Route path="/:userName/:id" component={UserPage}/>
  <Route path="/about/me" component={About}/>
</Router>
```

上面代码中，用户访问`/about/me`时，不会触发第二个路由规则，因为它会匹配`/:userName/:id`这个规则。因此，带参数的路径一般要写在路由规则的底部。

**query**
URL的查询字符串`/foo?bar=baz`，可以用`this.props.location.query.bar`获取。

##IndexRoute 组件
如有没有`IndexRoute` 组件访问根路径`/`，不会加载任何子组件。也就是说，`App`组件的`this.props.children`，这时是`undefined`。

加入`IndexRoute` 组件代码如下

```js
<Router>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```

现在，用户访问`/`的时候，加载的组件结构如下。

```js
<App>
  <Home/>
</App>

```
`IndexRoute`组件没有路径参数path

##Redirect 组件
`<Redirect>` 组件用于路由的跳转，即用户访问一个路由，会自动跳转到另一个路由。

```js
<Route path="inbox" component={Inbox}>
  {/* 从 /inbox/messages/:id 跳转到 /messages/:id */}
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
```
现在访问`/inbox/messages/5`，会自动跳转到`/messages/5`。

##IndexRedirect 组件
`IndexRedirect`组件用于访问根路由的时候，将用户重定向到某个子组件。

```js
<Route path="/" component={App}>
  ＜IndexRedirect to="/welcome" />
  <Route path="welcome" component={Welcome} />
  <Route path="about" component={About} />
</Route>
```
上面代码中，用户访问根路径时，将自动重定向到子组件`welcome`。

##Link
`Link`组件用于取代`<a>`元素

```js
render() {
  return <div>
    <ul role="nav">
      <li><Link to="/about">About</Link></li>
      <li><Link to="/repos">Repos</Link></li>
    </ul>
  </div>
```
如果希望当前的路由与其他路由有不同样式，这时可以使用Link组件的`activeStyle`属性。

```js
<Link to="/about" activeStyle={{color: 'red'}}>About</Link>
<Link to="/repos" activeStyle={{color: 'red'}}>Repos</Link>
```

另一种做法是，使用`activeClassName`指定当前路由的`Class`。

```js
<Link to="/about" activeClassName="active">About</Link>
<Link to="/repos" activeClassName="active">Repos</Link>
```
在`Router`组件之外，导航到路由页面，可以使用浏览器的`History API`，像下面这样写。

```js
import { browserHistory } from 'react-router';
browserHistory.push('/some/path');
```

##IndexLink
如果链接到根路由`/`，不要使用`Link`组件，而要使用`IndexLink`组件。
这是因为对于根路由来说，`activeStyle`和`activeClassName`会失效，或者说总是生效，因为/会匹配任何子路由。而`IndexLink`组件会使用路径的精确匹配。

```js
IndexLink to="/" activeClassName="active">
  Home
</IndexLink>

```
另一种方法是使用`Link`组件的`onlyActiveOnIndex`属性，也能达到同样效果。

```js
<Link to="/" activeClassName="active" onlyActiveOnIndex={true}>
  Home
</Link>
```
实际上，`IndexLink`就是对`Link`组件的`onlyActiveOnIndex`属性的包装。

##histroy 属性
`Router`组件的`history`属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 React Router 匹配。

`history`属性一共可以设置三种值。

* browserHistory
* hashHistory
* createMemoryHistory

**hashHistory**
路由将通过URL的hash部分（#）切换,URL的形式类似`example.com/#/some/path`。

**browserHistory**
显示正常的路径例如: `example.com/some/path`，背后调用的是浏览器的History API

```js
import { browserHistory } from 'react-router'

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
)

```

但是，这种情况需要对服务器改造。否则用户直接向服务器请求某个子路由，会显示网页找不到的404错误。
如果开发服务器使用的是`webpack-dev-server`，加上`--history-api-fallback`参数就可以了。
`$ webpack-dev-server --inline --content-base . --history-api-fallback`

**createMemoryHistory**
要用于服务器渲染。它创建一个内存中的history对象，不与浏览器URL互动。
`const history = createMemoryHistory(location)`

##表单处理
表单跳转、点击按钮跳转等操作与React Router 对接。

```js
<form onSubmit={this.handleSubmit}>
  <input type="text" placeholder="userName"/>
  <input type="text" placeholder="repo"/>
  <button type="submit">Go</button>
</form>

```
第一种方法是使用`browserHistory.push`

```js
import { browserHistory } from 'react-router'

// ...
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  },

```
第二种方法是使用`context`对象。

```js
export default React.createClass({

  // ask for `router` from context
  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {
    // ...
    this.context.router.push(path)
  },
})

```

##路由的钩子
每个路由都有`Enter`和`Leave`钩子，用户进入或离开该路由时触发。

```js
<Route path="about" component={About} />
＜Route path="inbox" component={Inbox}>
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>

```
面的代码中，如果用户离开`/messages/:id`，进入`/about`时，会依次触发以下的钩子。

* /messages/:id的onLeave
* /inbox的onLeave
* /about的onEnter

下面是一个例子，使用`onEnter`钩子替代`<Redirect>`组件。

```js

<Route path="inbox" component={Inbox}>
  <Route
    path="messages/:id"
    onEnter={
      ({params}, replace) => replace(`/messages/${params.id}`)
    } 
  />
</Route>

```

当用户离开一个路径的时候，跳出一个提示框，要求用户确认是否离开。

```js
const Home = withRouter(
  React.createClass({
    componentDidMount() {
      this.props.router.setRouteLeaveHook(
        this.props.route, 
        this.routerWillLeave
      )
    },

    routerWillLeave(nextLocation) {
      // 返回 false 会继续停留当前页面，
      // 否则，返回一个字符串，会显示给用户，让其自己决定
      if (!this.state.isSaved)
        return '确认要离开？';
    },
  })
)
```

上面代码中，`setRouteLeaveHook`方法为`Leave`钩子指定`routerWillLeave`函数。该方法如果返回`false`，将阻止路由的切换，否则就返回一个字符串，提示用户决定是否要切换。
