---
tags: [Notebooks/HTML-CSS]
title: bootstrap 技巧
created: '2019-02-25T14:16:12.866Z'
modified: '2019-02-25T14:30:04.024Z'
---

# bootstrap 技巧
##carousel 淡入淡出轮播CSS

``` css
.carousel.carousel-fade .item {
  -webkit-transition: opacity 2s ease-in-out;
  -moz-transition: opacity 2s ease-in-out;
  -ms-transition: opacity 2s ease-in-out;
  -o-transition: opacity 2s ease-in-out;
  transition: opacity 2s ease-in-out;
}
.carousel.carousel-fade .active.left,
.carousel.carousel-fade .active.right {
  left: 0;
  z-index: 2;
  opacity: 0;
  filter: alpha(opacity=0);
}
.carousel.carousel-fade .next,
.carousel.carousel-fade .prev {
  left: 0;
  z-index: 1;
}
.carousel.carousel-fade .carousel-control {
  z-index: 3;
}
```
