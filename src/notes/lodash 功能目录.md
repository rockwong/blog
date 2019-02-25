---
tags: [Notebooks/Lodash]
title: lodash 功能目录
created: '2019-02-25T14:16:44.318Z'
modified: '2019-02-25T14:31:22.766Z'
---

# lodash 功能目录

函数名称对应的功能说明，方便查看源代码

**★** 特别提醒

` each` forEach

` all`  every

` any ` some

`detect` ★ Return the first value which passes a truth test.

`select` ★ filter

`include` includes

`inject` ★ reduce

`invoke` ★ (fnList,methodProps,...arguments) map每个fnList将arguments传入，并输出结果

`max` 返回数组中最大的一个数

`min` 返回数组中最小的一个数

`pluck` ★ (objs,key) 将map数组对象中的 key值(对象属性可选‘key’,'value')，并输出

`reject` ★  filter的反向版，返回 iterator 为false的值

`sortBy` 数组排序

`sortedIndex` ★  (array,comparator,obj)  循环array 通过 comparator决定排序，来获取obj应该放入array中的索引位置。

`toArray`  转数组

`compact ` ★ 去掉数组中所有假值，false, null, 0, "", undefined, 和 NaN

`flatten`  ★ 减少一级array嵌套深度

`without ` ★ （array,...arguments）去掉数组中包含arguments中值。

`uniq` 数组去重

`intersect` ★ 返回两个数组中的交集 


## 对象

`bindAll`  (obj,...bindMethodName),将obj中的每个 bindMethodName 方法，绑定this 为
