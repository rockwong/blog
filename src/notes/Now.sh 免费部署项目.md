---
tags: [Notebooks/Tools]
title: Now.sh 免费部署项目
created: '2019-02-25T14:39:35.372Z'
modified: '2019-02-25T14:40:46.481Z'
---

# Now.sh 免费部署项目

## about

ZEIT是美国一家提供云部署服务的公司，旗下的 Now.sh提供了Realtime global deployments(全球化实时部署)服务。

## 免费的 OSS 服务
名称 | 	配置
| -------: | ------- |
带宽 |	1GB*
日志 |	100MB*
部署 |	∞
并发实例	 |3
CDN 域名 | 不支持
域	 | ∞
MAX文件大小/存储空间	 |5MB / 1GB
自动增长支持	 |不支持
团队协作人数	 |支持


## 使用步骤

``` bash
# 安装
npm install -g now

#登录,需在邮件中确认
now login
```

## 部署

`static`

```bash
 projectdir/ now
```

`Node.js 部署`

部署命令与静态资源一样，但应用程序目录中有一个package.json文件，那么Now.sh会认为有效的Node.js部署。这是一个简单的Node.js部署在微服务

Node.js 应用必须要用以下两个文件才能被 Now.sh 识别。

示例代码：index.js
```js
module.exports = () => ({
  date: new Date
})
```

示例代码：package.json
```json
{
  "name": "get-started-node",
  "version": "0.1.0",
  "dependencies": {
    "micro": "latest"
  },
  "scripts": {
    "start": "micro"
  }
}
```

`Docker 部署`

应用程序目录包含一个Docker文件，那么现在考虑一个有效的Docker部署。它将基于Dockerfile构建一个docker映像，并基于此启动容器。

部署一个简单的Go HTTP服务器，创建一个目录并添加这两个文件：

示例代码： hello.go

```go
package main

import (
    "io"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        io.WriteString(w, "Hello world!")
    })

    err := http.ListenAndServe(":8000", nil)
    if err != nil {
        panic(err)
    }
}
```

示例代码： Dockerfile


```
FROM golang:alpine
ADD . /go/src/zeit/hello
RUN go install zeit/hello
CMD ["/go/bin/hello"]
EXPOSE 8000
```

`部署总结：`

项目在部署完成之后，我们会得到一个链接，可以通过这个链接来访问部署的项目。

每次更新部署后， url 都会生成一个新的，但是老的 url 都还是可以用的。如果最终网站要产品化，可以很容易的绑定自己的域名。

## Now.sh - 域名

`now.sh提供的域名`

```bash
#  alias 指定域名
$ now alias https://my-name.now.sh my-web-app

# 发布当前文件夹项目 并 alias 
$ now alias may-web-app
```

`now.sh管理的自定义域名`

1. 如果域名解析的DNS 由 now.sh 托管则，直接使用托管域名即可
2. 如果解析不在now.sh则需要在域名解析商增加 `CNAME` 记录 值为`alias.zeit.co`, 然后运行一下命令

```bash
#  alias 指定域名
$ now alias https://my-web-app-avvuiuuwto.now.sh my-web-app.com

# 发布当前文件夹项目 并 alias 
$ now alias my-web-app.com
```

## 注意事项

`优势：`
* 自带的 https
* 真正的一键部署，不用自己管理服务器，将 severless 进行到底
* 不翻墙，访问速度很棒

`其他`
* 为了节省资源，应用一段时间不用就会被 frozen （冻结），但是只要我们去敲链接去访问，就会自动 unfrozen ，只不过初次访问速度会受影响。
* 在 Now.sh提供的免费服务中，您的代码将是公开的和开源的，如果介意可升级账户或放弃使用。
