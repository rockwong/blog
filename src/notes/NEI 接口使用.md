---
tags: [Notebooks/Tools]
title: NEI 接口使用
created: '2019-02-25T14:39:35.371Z'
modified: '2019-02-25T14:40:46.481Z'
---

# NEI 接口使用


## 开始

```bash
# 安装
npm install nei –g

# 更新
npm update nei -g
```

## 指令

```bash
nei [指令] [参数]
```

其中可用的指令包括：

| 指令  | 描述 |
| :--- | :--- |
| build  | 根据在 NEI 平台上定义的工程规范，生成工程的初始化目录结构 |
| update | 更新通过 `nei build` 构建的项目 |
| server | 启动本地模拟容器 |
| template | 使用本地数据解析模板 |

### build

```bash
nei build -k [key] [参数]
``` 

| 简写 | 全称 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| -h | --help |  | 显示 build 命令的帮助信息 |
| -o | --output | ./ | 指定项目的输出目录 |
| -k | --key |  | 项目的唯一标识，可以在项目的"工具(设置)"中查看 |
| -sk| --specKey |  | 规范的唯一标识，可以在规范的"规范设置"中查看 |
| -w | --overwrite | false | 是否覆盖已存在的文件，需要下载的文件不在此列，如果需要重新下载，请先将本地的文件删除 |
| 无 | --specType | web | 要构建的规范类型，目前支持 web、aos、ios、test 四种类型 |


### update

```bash
nei update [参数] 

nei update -w true  # 更新并覆盖当前文件

nei update -w true -develop true # 更新并覆盖当前文件,在args字段中增加 develop字段，值为true
``` 

`nei update` 指令可用的参数包括：

| 简写 | 全称 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| -h | --help  | | 显示 update 命令的帮助信息 |
| -o | --output | ./ | 指定的项目目录 |
| -k | --key |  | 需要更新的项目的唯一标识 |
| -a | --all | false | 是否更新指定目录下面的所有项目，前提是没有指定的 key |
| -w | --overwrite | false | 是否覆盖已存在的文件，需要下载的文件不在此列，如果需要重新下载，请先将本地的文件删除 |
| 无 | --spec | false | 是否更新规范中的普通文件和文件夹，以数据填充的文件不在此列 |
