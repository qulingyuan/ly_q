### config

查看config : `git config --list --global`

配置用户名：`git config --global user.name 'ly_qu'`

配置邮箱：`git config --global user.email 'ly_qu@xxx.com'`


git config 有三种选项：

`--local` : 只对某个仓库有效

`--global` : 对当前用户所有仓库有效

`--system` : 对系统所有登录的用户有

### 创建仓库

1. 已有项目纳入git管理：

```shell
cd 项目所在文件夹
git init
```

2. 新建的项目直接用git管理:

```shell
git init project_name
```



### 查看修改

```shell
git diff  # 查看工作区和暂存区的diff
git diff --staged  # 查看暂存区和本地仓库的diff
git diff --cached  # 同上
git difftool --tool-help  # 查看系统支持哪些 git diff 插件
```



### 添加到暂存区

```shell
git add .  # 将
```

### 提交到本地仓库

```shell
git commit -m 'comment'  # 仅将暂存区的修改提交到本次仓库
git commit -a -m 'comment'  # -a表示将工作区及暂存区的修改全部提交
```

文件重命名

```shell
git mv [name] [new_name]  # 文件重命名
git log --oneline  # 简洁的查看log
git log --all  # 查看所有的历史
git log --graph  # 查看
git log --n2  # 只查看最近的两次commit
```

