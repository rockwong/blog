---
tags: [Notebooks/React]
title: react-redux
created: '2019-02-25T14:00:31.031Z'
modified: '2019-02-25T14:02:51.525Z'
---

# react-redux

##Provider
`Provider`这个模块是作为整个`App`的容器,接受Redux的store作为props。
并将其声明为`context`的属性之一，子组件可以在声明了`contextTypes`之后可以方便的通过`this.context.store`访问到`store`。不过我们的组件通常不需要这么做，将`store`放在`context`里，是为了给下面的`connect`用的。


```js
// config app root
const history = createHistory()  
const root = (  
  <Provider store={store} key="provider">
    <Router history={history} routes={routes} />
  </Provider>
)

// render
ReactDOM.render(  
  root,
  document.getElementById('root')
)
```

##connect
Redux如何运作：首先`store`中维护了一个`state`，我们`dispatch`一个`action`，接下来`reducer`根据这个`action`更新`state`。

**API如下：**
`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])  `

**mapStateToProps**
是一个函数，返回值表示的是需要merge进props的state。默认值为`() => ({})`，即什么都不传。

```js
(state, props) => ({  }) // 通常会省略第二个参数
```

**mapDispatchToProps**
可以是一个函数，返回值表示的是需要merge仅props的actionCreators，这里的actionCreator应该是已经被包装了dispatch了的，推荐使用redux的bindActionCreators函数。

```js
(dispatch, props) => ({ // 通常会省略第二个参数
 ...bindActionCreators({
   ...ResourceActions
 }, dispatch)
})
```

**mergeProps**
用于自定义merge流程，下面这个是默认流程，parentProps值的就是组件自身的props，可以发现如果组件的props上出现同名，会被覆盖。

```js
(stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})
```

**options**
共有两个开关：pure代表是否打开优化，详细内容下面会提，默认为true，withRef用来给包装在里面的组件一个ref，可以通过getWrappedInstance方法来获取这个ref，默认为false。


`connect`返回一个函数，它接受一个React组件的构造函数作为连接对象，最终返回连接好的组件构造函数。


当`storeState`变化的时候，仅在我们真正依赖那部分state变化时，才重新render相应的React组件，那么什么是我们真正依赖的部分？就是通过`mapStateToProps`和`mapDispatchToProps`得到的

**关于reducer**
一个函数,功能就是在action触发后，返回一个新的state(就是个对象)

```js
export default (state = {}, action) => {  
  return { ...state } // 返回的是一个新的对象，可能会使组件reRender
  // return state // 可能不会使得组件reRender
}
```

`connect`的时候，要谨慎map真正需要的state或者actionCreators到props中，以避免不必要的性能损失
