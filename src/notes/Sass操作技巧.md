---
tags: [Notebooks/HTML-CSS]
title: Sass操作技巧
created: '2019-02-25T14:16:31.322Z'
modified: '2019-02-25T14:29:04.528Z'
---

# Sass操作技巧
##快速书写响应式样式
```sass
@mixin iphone {  
  @media only screen and (max-width: 480px) {  
    @content;  
  }  
} 
@include iphone {  
  body { color: red }  
} 
```
