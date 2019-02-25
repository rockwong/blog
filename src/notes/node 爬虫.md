---
tags: [Notebooks/Node]
title: node 爬虫
created: '2019-02-25T14:16:04.429Z'
modified: '2019-02-25T14:57:18.890Z'
---

# node 爬虫

## 维持登录状态

大部分网站的的登录都是基于`cookie` 和 `session` 来进行，所以在爬需要登录的接口时需要获取已登录的的`cookie`,利用它来伪造登录。

1. 登录目标网站，访问需要登录权限的页面
2. 在`chrome` 的开发者工具中的` network `中找到需要check登录的请求，并将从 header中找到 `cookie`的值，复制下来
3. 将复制的`cookie` 附在爬虫请求的 `header`中即可伪造登录。

## url 处理

当`url`地址中含有中文，无法下载的问题
`encodeURI(downloadUrl)`


## 存放路径地址

使用 `path` 会解决 不同系统下路径访问的问题。
`path.join(pathStr)`
