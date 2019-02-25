---
tags: [Notebooks/HTML-CSS]
title: flex 布局
created: '2019-02-25T14:16:31.319Z'
modified: '2019-02-25T14:29:04.519Z'
---

# flex 布局

##flex 容器

```css
.box{
 	display: -webkit-flex; 
 	display: flex;
}
.inline{
	display: -webkit-inline-flex;
	display: inline-flex;
}
```
**注意**，设为Flex布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

##容器属性

* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

###flex-direction
`flex-direction` 属性决定主轴的方向（即项目的排列方向）。

```css
.box {
	flex-direction: row | row-reverse | column | column-reverse;
}
```

###flex-wrap
`flex-wrap`属性定义，如果一条轴线排不下，如何换行。

```css
.box{
	flex-wrap: nowrap | wrap | wrap-reverse;
}
```
###flex-flow
`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`

```css
.box {
	flex-flow: <flex-direction> || <flex-wrap>;
}
```
###justify-content
`justify-content`属性定义了项目在主轴上的对齐方式。

```css
.box {
	justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

###align-items
`align-items`属性定义项目在交叉轴上如何对齐。

```css
.box {
	align-items: flex-start | flex-end | center | baseline | stretch;
}
```

###align-content
`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
	align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

##项目的属性

* order
* flex-grow
* flex-shrink
* flex-basis
* flex
* align-self

###order
`order`  属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
	order: <integer>;
}
```
###flex-grow
`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.item {
	flex-grow: <number>; /* default 0 */
}
```

###flex-shrink
`flex-shrink`属性定义了项目的缩小比例，默认为`1`，即如果空间不足，该项目将缩小。
如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。
负值无效

```css
.item {
	flex-shrink: <number>; /* default 1 */
}
```
### flex-basis
`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

```css
.item {
	flex-basis: <length> | auto; /* default auto */
}
```

###flex
`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。
该属性有两个快捷值：auto `(1 1 auto) `和 none `(0 0 auto)`。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```


### align-self

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
