---
tags: [Notebooks/Node]
title: Nvm
created: '2019-02-25T14:16:04.431Z'
modified: '2019-02-25T14:57:18.888Z'
---

# Nvm

## 采用淘宝源

## 使用新的默认node包后，无法使用npm全局包

```bash
nvm install v9.5.0 --reinstall-packages-from=v9.2.0 # 重新安装旧版本的全局包

npm update -g  # 更新全局包
```


## 常用命令


```bash

nvm uninstall <version>  ## 删除已安装的指定版本，语法与install类似

nvm use <version>  ## 切换使用指定的版本node

nvm ls ## 列出所有安装的版本

nvm ls-remote ## 列出所以远程服务器的版本（官方node version list）

nvm current ## 显示当前的版本

nvm install node ##安装最新版 Node

nvm install 8.5 ##安装8.5版 Node

nvm install unstable ##安装最新不稳定版本的 Node

nvm alias default v11.2.0  ## 设置默认版本

```
