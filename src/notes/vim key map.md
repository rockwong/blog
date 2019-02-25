---
tags: [Notebooks/Tools]
title: vim key map
created: '2019-02-25T14:39:35.373Z'
modified: '2019-02-25T14:40:46.480Z'
---

# vim key map

### 教程演练
终端输入： `vimtutor`

### 第一级
| Key  | Action |
| -------: | ------- |
| `i`		| Insert 模式，按 `ESC` 回到 Normal 模式.|
| `x`		| 删当前光标所在的一个字符 |
| `:wq`  	| 存盘 + 退出 |
| `dd`		| 删除当前行，并把删除的行存到剪贴板里 |
| `p`		| 粘贴剪贴板 |
| `hjkl`	| (←↓↑→). 注: j 就像下箭头 |

### 第二级

###各种插入
| Key  | Action |
| -------: | ------- |
| `a`		| 在光标后插入|
| `o`		| 在当前行后插入一个新行 |
| `O`  	| 在当前行前插入一个新行 |
| `cw`		| 替换从光标所在位置后到一个单词结尾的字符 |
| `p`		| 粘贴剪贴板 |

###移动光标
| Key  | Action |
| -------: | ------- |
| `0`		| 数字零，到行头|
| `^`		| 到本行第一个不是blank字符的位置 |
| `$`  	| 到本行尾 |
| `cw`		| 替换从光标所在位置后到一个单词结尾的字符 |
| `/pattern`		| 搜索 `pattern`的字符串 |
| `NG`		| 到`N`行 |
| `gg`		| 到第一行 |
| `G`		| 到最后一行 |
| `w`		| 到一下个单词的开头 |
| `e`		| 到一下个单词的结尾 |
| `%`		| 匹配夸号移动 |
| `*/#`	| 匹配光标所在的单词 `*` 下一个，`#` 上一个 |

### 更快的移动鼠标
你一定要记住光标的移动，因为很多命令都可以和这些移动光标的命令连动。很多命令都可以如下来干：

`<start position><command><end position>`

例如 `0y$` 命令意味着：

`0` → 先到行头
`y` → 从这里开始拷贝
`$` → 拷贝到本行最后一个字符
你可可以输入 `ye`，从当前位置拷贝到本单词的最后一个字符。

你也可以输入 `y2/foo` 来拷贝2个 “foo” 之间的字符串。

还有很多时间并不一定你就一定要按y才会拷贝，下面的命令也会被拷贝：

`d` (删除 )
`v` (可视化的选择)
`gU` (变大写)
`gu` (变小写)


###拷贝/粘贴
| Key  | Action |
| -------: | ------- |
| `p`		| 粘贴|
| `yy`		| 拷贝 |

###Undo/Redo
| Key  | Action |
| -------: | ------- |
| `u`		| undo	|
| `<C-r>`	| redo |


### Various methods
| Trigger  | Content |
| -------: | ------- |
| `fre→`   | forEach loop in ES6 syntax `array.forEach(currentItem => {})`|
| `fof→`   | for ... of loop `for(const item of object) {}` |
| `fin→`   | for ... in loop `for(const item in object) {}` |
| `anfn→`  | creates an anonymous function `(params) => {}` |
| `nfn→`   | creates a named function `const add = (params) => {}` |
| `dob→`   | destructing object syntax `const {rename} = fs` |
| `dar→`   | destructing array syntax `const [first, second] = [1,2]` |
| `sti→`   | set interval helper method `setInterval(() => {});` |
| `sto→`   | set timeout helper method `setTimeout(() => {});` |
| `prom→`  | creates a new Promise `return new Promise((resolve, reject) => {});`|

### Console methods
| Trigger  | Content |
| -------: | ------- |
| `cas→`   | console alert method `console.assert(expression, object)`|
| `ccl→`   | console clear `console.clear()` |
| `cco→`   | console count `console.count(label)` |
| `cdi→`   | console dir `console.dir` |
| `cer→`   | console error `console.error(object)` |
| `cgr→`   | console group `console.group(label)` |
| `cge→`   | console groupEnd `console.groupEnd()` |
| `clg→`   | console log `console.log(object)` |
| `ctr→`   | console trace `console.trace(object)` |
| `cwa→`   | console warn `console.warn` |
| `cin→`   | console info `console.info` |
| `clt→`   | console table `console.table` |
