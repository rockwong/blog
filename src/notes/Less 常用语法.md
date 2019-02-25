---
tags: [Notebooks/HTML-CSS]
title: Less 常用语法
created: '2019-02-25T14:16:31.321Z'
modified: '2019-02-25T14:29:04.518Z'
---

# Less 常用语法


## 变量


```less

/*  变量声明和运算 */
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

/*  变量名定义为变量 */
@fnord: "I am fnord.";
@var: 'fnord';
content: @@var;  /*  content: "I am fnord." */

```


## 混合

**其他class中引入那些通用的属性集**

```less

.global {
  border-bottom: dotted 1px black;
}

.post a{
	color:red;
	.global;
}

```

**带参数的属性集**

使用带参数的属性集后，class不会编译到css中，可以用空的参数属性集优化输出。


```less
.border-radius (@radius: 5px) { 
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}

#header {
  .border-radius(6px);  
}
#default {
  .border-radius;  /* 采用默认值5px */ 
}

```

**@arguments 变量**

@arguments包含了所有传递进来的参数

```less
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
  box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  -webkit-box-shadow: @arguments;
}
.box-shadow(2px, 5px);

```
