---
tags: [Notebooks/Tools]
title: Git常用命令
created: '2019-02-25T14:39:35.368Z'
modified: '2019-02-25T14:40:46.483Z'
---

# Git常用命令

Git 游戏用来练习 git命令行 <http://www.jianshu.com/p/482b32716bbe>,



##配置
Git的设置文件为`.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。

```bash
# 显示当前的Git配置
$ git config --list

#查看用户名
$ git config --global user.name  

# 记住git 账户及密码
git config --global credential.helper store

#查看邮箱
$ git config --global user.email  

# Git显示颜色
$ git config --global color.ui true   

```

##新建仓库

``` bash
# 在当前目录新建一个git仓库
$ git init                 

#复制一个git仓库
$ git clone url
```

##查看文件

```
#查看指定文件的log,  -p:查看代码行的详细修改
$ git log -- [-p]  [file]

# 查看commit的数量
$ git rev-list master  --count

```

##增加/删除文件
```bash
# 将当前目录文件添加的到仓库
$ git add .             

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file] 

#撤销本地修改
$ git checkout -- /there/is/a/modified/file

#撤销暂存区修改
$git reset HEAD  /path/

$ git reset --hard # removes staged and working directory changes
$ git clean -f -d # remove untracked
```

##代码提交
```bash
# 查看分支的提交数量
$ git rev-list master --count 

# 当前commit 在分支中的计数
$ git rev-list --count HEAD


# 将文件提交到仓库
$ git commit -m [message] 

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

$ git status               # 查看当前库状态

$ git diff filename        # 提交前查看文件差异     

$ git log                  # 一行 --oneline,内容--patch,概述--stat

$ git reflog               # 命令历史

$ git reset --hard HEAD^    # 回退到上一个版本
--soft 参数将上一次的修改放入 staging area
--mixed 参数将上一次的修改放入 working directory
--hard 参数直接将上一次的修改抛弃

$ git rebase  origin/master    #以替代的方式拉取远程的提交

$ git blame  # 查看代码每行修改的作者

$ git checkout  #切换branch的名称或者tag名称，如果冲突 tag/tagname

$ git cherry-pick commit_id   #将选中的commit加入到当前分支
$ git cherry-pick <start-commit-id>..<end-commit-id> #将start-commit-id（不包括） 到 end-commit-id加入到当前分支

$ git commit --amend  #

```

##代码合并

```bash
	#合并分支上的提交
	$ git merge --squash another
	
	#创建空白分支
	$ git checkout --orphan gh-pages 
	
	#引入来自其它分支的文件
	$ git checkout other_branch_name  files/to/grab in/list/separated/by/spaces -p
```
## 代码推送
```bash
# push 本地 test 分支作为远程的 master分支
$ git push origin test:master

# 推送本地目录 dist 到远程分支的gh-pages
$ git subtree push --prefix dist origin gh-pages
```

##进阶命令
### checkout
``` bash
$ git checkout –b new_branch local_branch   #切换到某个本地分支local_branch，用此分支初始化一个新分支new_branch
$ git checkout –b new_branch remote_branch  #切换到某个远程分支remote_branch，用此分支初始化一个新分支new_branch。
$ git checkout –b new_branch commit_id      #切换到某个commit id，并建立新分支new_branch
$ git checkout –b new_branch tag            #切换到某个tag，并建立新分支new_branch

```
### bisect

使用"两分法"查错

```bash
$ git bisect start HEAD start_commit_id  # 设置开始和结束的commit,自动切换到中间的commit

$ git bisect good # 检查代码如果正确输入该命令

$ git bisect bad # 检查代码如果错误输入该命令

$ git bisect reset # 查找到错误退出查错，去修复代码即可

```

##使用技巧

### 删除错误提交的commit
``` 
git reset --hard <commit_id>
git push origin HEAD --force
```


## zsh git alias
> .oh-my-zsh/plugins/git/git.plugin.zsh

```bash
alias g='git'
alias ga='git add'
alias gaa='git add --all'

alias gb='git branch'
alias gba='git branch -a'  # 查看所有分支
alias gbd='git branch -d'  # delete branch

alias gc='git commit -v'  # 查看修改内容并提交
alias gc!='git commit -v --amend' # 替代上次提交或改写
alias gca='git commit -v -a'  #提交所有修改
alias gcam='git commit -a -m'  # 提交搜索有修改并添加说明

alias gcb='git checkout -b'  # 创建并切换分支
alias gcm='git checkout master'
alias gcd='git checkout develop'

alias gcp='git cherry-pick'
alias gcpa='git cherry-pick --abort'

alias gf='git fetch'
alias gfo='git fetch origin'

alias gl='git pull'

alias glo='git log --oneline --decorate'

alias gm='git merge'
alias gmom='git merge origin/master'

alias gp='git push'

alias gr='git remote'
alias gra='git remote add'
alias grv='git remote -v'

alias grh='git reset HEAD'
alias grhh='git reset HEAD --hard'

alias gst='git status'


```
