---
tags: [Notebooks/Javascript]
title: 按位操作符（Bitwise operators）
created: '2019-02-25T14:15:27.029Z'
modified: '2019-02-25T14:18:17.489Z'
---

# 按位操作符（Bitwise operators）

将其操作数（operands）当作32位的比特序列（由0和1组成），而不是十进制、十六进制或八进制数值.

运算符	| 用法 | 	描述
----- |----|-----
按位与（ AND）  |	a & b | 对于每一个比特位，只有两个操作数相应的比特位都是1时，结果才为1，否则为0。
按位或（OR）    |	a | b	| 对于每一个比特位，当两个操作数相应的比特位至少有一个1时，结果为1，否则为0。
按位异或（XOR）  |	a ^ b	| 对于每一个比特位，当两个操作数相应的比特位有且只有一个1时，结果为1，否则为0。
按位非（NOT）	| ~ a	| 反转操作数的比特位，即0变成1，1变成0。
左移（Left shift）| 	a << b |	将 a 的二进制形式向左移 b (< 32) 比特位，右边用0填充。
有符号右移	| a >> b	| 将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位。
无符号右移	 | a >>> b | 	将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位，并使用 0 在左侧填充。



## 操作符掩码


```js
    
    // 多个场景统计，只统计一次
    var screenTrackFlag = 0;  // 跟踪场景（index）的统计情况
   function trackScreen(screenIndex) {
        var screenBit = (1 << screenIndex);  // 1 左移 场景的index，即当前场景的二进制
        if ((screenTrackFlag & screenBit) == 0) {   // 场景的二进制与screenTrackFlag对比，确认没有执行过
            screenTrackFlag = screenTrackFlag | screenBit;
        }
    }
```


## 取整

`1.23<<0` 左移运算符 ，舍弃小数部分
`1.23>>0` 右移运算符，舍弃小数部分

## 值交换


```
var a = 5
var b = 8
a ^= b
b ^= a
a ^= b
console.log(a)   // 8
console.log(b)   // 5
```

## 使用&, >>, |来完成rgb值和16进制颜色值之间的转换


```js
/**
 * 16进制颜色值转RGB
 * @param  {String} hex 16进制颜色字符串
 * @return {String}     RGB颜色字符串
 */
  function hexToRGB(hex) {
    var hexx = hex.replace('#', '0x')
    var r = hexx >> 16
    var g = hexx >> 8 & 0xff
    var b = hexx & 0xff
    return `rgb(${r}, ${g}, ${b})`
}

/**
 * RGB颜色转16进制颜色
 * @param  {String} rgb RGB进制颜色字符串
 * @return {String}     16进制颜色字符串
 */
function RGBToHex(rgb) {
    var rgbArr = rgb.split(/[^\d]+/)
    var color = rgbArr[1]<<16 | rgbArr[2]<<8 | rgbArr[3]
    return '#'+ color.toString(16)
}
// -------------------------------------------------
hexToRGB('#ffffff')               // 'rgb(255,255,255)'
RGBToHex('rgb(255,255,255)')      // '#ffffff'

```
