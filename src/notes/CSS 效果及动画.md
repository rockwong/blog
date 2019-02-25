---
tags: [Notebooks/HTML-CSS]
title: CSS 效果及动画
created: '2019-02-25T14:16:31.316Z'
modified: '2019-02-25T14:29:04.522Z'
---

# CSS 效果及动画

## 动画事件
` 动画中的事件响应区域` 如果想事件响应区域根据动画位置调整，需要reflow，例如：实时的添加/删除无css的class  

##无停顿转圈

```css
@-webkit-keyframes circle{
  to{
    -webkit-transform:rotate(1turn);
  }
}
```

## 用Sass的mixin来制作逐帧动画

```css
/**

$name   = keyframes name
$xNum   = 水平图片数量
$yNum   = 垂直图片数量
$keyNum = 关键帧数量 (可选参数:默认是水平图片数量*垂直图片数量)
 **/

@mixin frame($name,$xNum,$yNum,$keyNum:$xNum * $yNum) {
  @keyframes #{$name} {
    @for $i from 0 through $yNum - 1 {
      @for $j from 0 through $xNum - 1 {
        #{(($i*($yNum - 1)+$j)*100/($keyNum - 1))}% {
          @if $keyNum>($i*($yNum - 1)+$j) {background-position: 1/($xNum - 1)*$j*100% 1/($yNum - 1)*$i*100%;}
        }
      }
    }
  }
} @include frame(an1,7,8,50); @include frame(an2,7,7);

.an2 {
  animation-name: an2;  
  animation-timing-function: step-end; 
  animation-duration: 5s;
  animation-iteration-count: infinite;   height: 300px;   width: 300px;
  background-image: url(../images/anim2.jpeg);
  background-repeat: no-repeat;
  background-size: 700% 700%;
  }

```
