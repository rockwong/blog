---
tags: [Notebooks/Javascript]
title: 代码测试Mocha
created: '2019-02-25T14:15:27.032Z'
modified: '2019-02-25T14:18:17.491Z'
---

# 代码测试Mocha

##示例代码

**add.js**


```js
// add.js
function add(x, y) {
  return x + y;
}

module.exports = add;

```

**add.test.js**

```js
// add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

##命令

**--recursive** 
子目录下面所有的测试用例

**--growl, -G**
打开--growl参数，就会将测试结果在桌面通知显示。

**--watch，-w**
--watch参数用来监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha。

**--bail, -b**
--bail参数指定只要有一个测试用例没有通过，就停止执行后面的测试用例。这对持续集成很有用。

**--grep, -g**
--grep参数用于搜索测试用例的名称（即it块的第一个参数），然后只执行匹配的测试用例。

```bash
$ mocha --grep "1 加 1"
```

**--invert, -i**
--invert参数表示只运行不符合条件的测试脚本，必须与--grep参数配合使用。

```bash
$ mocha --grep "1 加 1" --invert
```

## 配置文件mocha.opts
Mocha允许在test目录下面，放置配置文件mocha.opts，把命令行参数写在里面

```bash
	$ mocha --recursive --reporter tap --growl
```
`test` 目录下的 `mocha.opts`

```
--reporter tap
--recursive
--growl
```
