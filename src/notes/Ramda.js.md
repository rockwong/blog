---
tags: [Notebooks/Javascript]
title: Ramda.js
created: '2019-02-25T14:15:27.043Z'
modified: '2019-02-25T14:18:17.502Z'
---

# Ramda.js

## Function 相关接口

### complement
它传入一个函数，返回一个新的函数：当原函数返回 "假值" 时，新函数返回 true；原函数返回 "真值" 时，新函数返回 false

### both/either 和 allPass/anyPass
`both` 接受两个函数，返回一个新函数：当两个传入函数都返回 truthy 值时，新函数返回 true，否则返回 false
`either` 接受两个函数，返回一个新函数：当两个传入函数任意一个返回 truthy 值时，新函数返回 true，否则返回 false
`allPass/anyPass` 接受多个参数，allPass 类似于 both，而 anyPass 类似于 either

### pipe/compose
`pipe` 函数：接受一系列函数，并返回一个新函数,执行顺序从左到右
`compose` 类似 pipe 执行顺序相反

### partial/partialRight
返回一个接受剩余参数的新函数，当所有参数都传入后，才会真正调用被包裹的原函数
`partial` 和 `partialRigth`的区别是参数传递的顺序

**包裹函数提供的参数必须包裹在数组中**

###curry
* 可以按正常情况下使用所有参数调用它，它可以像普通函数一样正常工作；
* 也可以使用部分参数来调用它，这时它会像使用 partial 一样工作。

## Type 类型判断
`isEmpty` 检测给定值是否为其所属类型的空值，若是则返回 true ；否则返回 false 

```js
R.isEmpty([1, 2, 3]);   //=> false
R.isEmpty([]);          //=> true
R.isEmpty('');          //=> true
R.isEmpty(null);        //=> false
R.isEmpty({});          //=> true
R.isEmpty({length: 0}); //=> false
```
`isNil` ->` null || undefined`
`equals` -> `===`
`gt` 	-> `>`
`lt` 	-> `<`
`lte` 	-> `<=`
`gte` 	-> `>=`

## Logic 逻辑相关

`defaultTo` 检查第二个参数是否为空（isNil）。如果非空，则返回该值；否则返回第一个值

## always 常量

返回一个返回恒定值的函数
 `T` 和 `F`，是 `always(true)` 和 `always(false)` 的缩写
```js
var t = R.always('Tee');
t(); //=> 'Tee'
```

##filter/reject

reject 是 filter 的补操作。它保留使断言函数返回 "falsy" 的元素，排除使断言函数返回 "truthy" 的元素
