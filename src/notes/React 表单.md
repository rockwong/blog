---
tags: [Notebooks/React]
title: React 表单
created: '2019-02-25T14:00:31.025Z'
modified: '2019-02-25T14:02:51.518Z'
---

# React 表单

##textarea
在 HTML 中，textarea 的值是像如下定义的：

```html
<textarea name="" id="" cols="30" rows="10">
    some value
</textarea>
```
而在 React 中， TextArea 的使用方式同 input 组件，使用 value 来设置值

```js
var MyComponent = function() {
    render: function() {
        return <div>
                    <textarea value={...} onChange={...}/>
                </div>
    }
}
```

##select
在 React 中 select 组件支持 value 值，value 值还支持多选

```js
<select value="B">
    <option value="A">Apple</option>
    <option value="B">Banana</option>
    <option value="C">Cranberry</option>
  </select>

  <select multiple={true} value={['B', 'C']}>
    <option value="A">Apple</option>
    <option value="B">Banana</option>
    <option value="C">Cranberry</option>
  </select>

```

##受控组件
表单组件可分为两类，受控与非受控组件，受控组件是包含了 value 值的

```js
render: function() {
    return <input type="text" value="....."/>
}
```
为什么叫受控组件？ 因为这个时候用户不能修改 input 的值， input 的值永远是 value 固定了的值。
如果去掉 value 属性，那么就可以输入值了

##非受控组件
没有 value 值的 input

```js
render: function() {
    return <input type="text"/>
}
```
可以通过 defaultValue 属性来设置默认值

```js
render: function() {
    return <input type="text" defaultValue="Default Value">
}
```
类似的对于 checkbox 有 defaultChecked 属性

> 需要注意的是，默认值只适用于第一次渲染，在重渲染阶段将不会适用


##checkbox 和 radio
如果在 onChange 事件中调用了 preventDefault ，那么浏览器不会更新 checked 状态，即便事实上组件的值已经 checked 或者 unchecked 了 。

**如何处理 checkbox 呢？**
1. 避免调用 ev.preventDefault 
2. 在 setTimeout 中处理 checked 的修改
3. 使用 click 事件
	
```js
var CheckBox = React.createClass({
    getInitialState: function(){
        return {
            checked: false
        }
    },
    render: function() {
        return  <div>
            <input type="checkbox" 
                checked={this.state.checked} 
                onChange={this.onChange}/>
        </div>
    },
    onChange: function(ev) {
        this.setState({
            checked: true
        });
        ev.preventDefault();
    }
})

```
