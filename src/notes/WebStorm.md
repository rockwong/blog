---
tags: [Notebooks/Tools]
title: WebStorm
created: '2019-02-25T14:39:35.378Z'
modified: '2019-02-25T14:40:46.474Z'
---

# WebStorm


##技巧
**正则快速替换指定标签**
```<div>(.*\n)*</div>```

## 快捷键


## view
`⌘ + 1` 打开/关闭 工程目录
`⌘ + e` 最近打开的文件
`⌥ + space` 快速查看光标处的类或方法
`⌘ + Shift + F` 查找整个项目相关关键字文件
`⌘ + Shift + N`  通过文件名查找指定文件

## navigate

`⇧ + ⌘ + ] `  Go to next editor tab
`⇧ + ⌘ + [ `  Go to previous editor tab
`⌃ + ↑`   上一个方法
`⌃ + ↓`   下一个方法
`⌥ + ↑`   增量式的选中当前块
`⌥ + ↓`   减小选中范围
`⌥ + ⌘ + [`   代码块开始
`⌥ + ⌘ + ]`   代码块结束
`F2`   光标移动到代码错误处
` ⌘ + [`  上次光标处
` ⌘ + ]`  下次次光标处
`⌘ + Shift + delete`  #回到上次修改的地方

## code
`Shift + F6 ` 重命名文件名、函数名、局部变量、标签名，并搜索引用的文件。
`⌘ + T` VCS提交项目
`⌘ + K` VCS更新项目
`⌘ + G`     编辑所有位置
`⌘ + D`     复制当前行
`⌃ + O`     插入父类的方法
`⌘ + Delete`  删除一行
`⌘ + N`     生成代码段
`⌘ + j`  自动代码提示（提示的是自己定义的代码格式）
`⌘ + Shift + C`  复制当前文件磁盘路径到剪贴板
`control + shift + j`   	合并行


 
 
## 文件代码模板预设的变量

```
${PACKAGE_NAME} - the name of the target package where the new class or interface will be created.
${PROJECT_NAME} - the name of the current project.
${FILE_NAME} - the name of the PHP file that will be created.
${NAME} - the name of the new file which you specify in the New File dialog box during the file creation.
${USER} - the login name of the current user.
${DATE} - the current system date.
${TIME} - the current system time.
${YEAR} - the current year.
${MONTH} - the current month.
${DAY} - the current day of the month.
${HOUR} - the current hour.
${MINUTE} - the current minute.
${PRODUCT_NAME} - the name of the IDE in which the file will be created.
${MONTH_NAME_SHORT} - the first 3 letters of the month name. Example: Jan, Feb, etc.
${MONTH_NAME_FULL} - full name of a month. Example: January, February, etc.

```
