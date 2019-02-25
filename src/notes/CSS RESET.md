---
tags: [Notebooks/HTML-CSS]
title: CSS RESET
created: '2019-02-25T14:16:31.317Z'
modified: '2019-02-25T14:29:04.522Z'
---

# CSS RESET

##快捷使用的 css reset。
> 更专业的请使用 [normalize.css] (http://necolas.github.io/normalize.css/)

``` css
/* Reset */
html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong, tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video {margin:0;padding:0;}
img{border:0;}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {display:block;}
ol,ul {list-style:none;}
blockquote,q{quotes:none;}
textarea{overflow:auto;resize:none;}
h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}
a,a:hover{color:#333;}
textarea,input,button,select,keygen,legend{font:inherit;}
/* Basic Styles */
body{font-family:"Hiragino Sans GB","Lucida Grande",Microsoft YaHei,arial;color:#333;}
/* clear */
.clear:after {content:".";display:block;height:0;clear:both;visibility:hidden;font-size:0;}
.clear{zoom:1;}


body {
/* webkit moblie reset font size  */
 -webkit-text-size-adjust: 100%;
/* 抗锯齿  */
 -webkit-font-smoothing: antialiased;
 font-smoothing: antialiased;
 }

/* mac and pc and moblie font  from antd */
font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

//36kr 字体参考
'Avenir Next', Avenir, 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial, 'Liberation Sans', 'PingFang SC', 'Hiragino Sans GB', 'Source Han Sans CN', 'Source Han Sans SC', 'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp', sans-serif;

```
