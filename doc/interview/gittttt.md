### Config

```shell
#  http(s)模式下缓存认证信息
git config –global credential.helper cache  # 默认缓存认证信息15分钟
git config credential.helper 'cache –timeout=3600'  # 自定义缓存认证信息1小时
git config --global credential.helper store  # 永久记住认证信息
```

上面命令对应`.gitconfig`文件的如下配置：

```
[credential]
		helper = store
```





### LOG

```shell
git log --all  # 查看所有分支
git log --oneline  # 查看简短的log
git log -n4  # 查看最近4条commit记录
git log --graph  # 查看图形化的版本演进历史
```



```shell
git 
git checkout [file_name]  # 撤销对文件的修改
git status  # 查看文件改动
```

一般来说文件有以下状态：

1. Untracked : 未跟踪，表示文件在工作区中，但并没有加入暂存区被 git 版本控制，一般为新增文件，通过 git add 命令状态变为 Staged
2. Modified : 文件已修改。
3. Delete : 工作空间的文件已被删除，但服务器还没有删除。（存疑）
4. renamed : 文件名称被改变。

### Diff

```shell
git diff  # 比较工作区改动
git diff --cached [file_name]  # 比较暂存区和本地仓库的该文件改动
git diff [commit_hash]  # 工作区和指定记录之间比较改动
git diff --cached [commit_hash]  # 暂存区和指定记录比较改动
git diff HEAD  # 未提交的代码（工作区+暂存区）与最新的commit记录进行比较
git diff [commit_hash_1] [commit_hash_2]  # 两个commit或分支之间全部的diff
git diff [branch_1] [branch_2] --stat  # 两个branch之间比较哪些文件被修改了
git diff [branch_1] [branch_2] [file_name]  # 两个branch之间比较该文件中有哪些修改
```



```shell
git config --global core.fileMode false  # 忽略文件的权限

git add -f [文件名]  # 可以强推被.gitignore忽略的文件
```

### Branch

```shell
git branch  # 查看本地分支
git branch -a  # 查看本地&远程分支
git checkout [branch_name]  # 切换分支，当本地不存在该分支时，自动找到远程对应的分支然后在本地创建
git checkout -b [branch_name]  # 以当前分支为base创建新分支
 # 删除分支
git branch -d [branch_name]  # 普通删除
git branch -D [branch_name]  # 强制删除
```

### push

```shell
git push --set-upstream origin [branch_name]  # 本地新建的分支推送到远端
git push origin --delete [branch]  # 删除远程分支
```

### Merge

```shell
git merge [branch_name]  # 把其他分支merge到当前分支
```





````shell
git rm --cached [file_name]  # 忽略已加入版本控制器的文件
git rm -r --cached [floder_name]  # 忽略已加入版本控制器的文件夹
#上面两个命令要配合下面命令使用，因为已经在.gitignore中被忽略，所以要强推
git add -f [floder_name]  # 
````

版本回退(回滚)

```shell
git reset HEAD^  # 撤销最近一次提交
git reset [commit_id]  # 回滚到该次commit(包含此commmit)
git reset --soft [commit_id]  # 此次提交之后的修改会被退回暂存区。
git reset --hard [commit_id]  # 此次提交之后的修改不做任何保留
git reflog  # 记录每一次命令
```

### pull

`pull` 根据不同的配置，可等于 `fetch + merge` 或 `fetch + rebase`。

```shell
git remote add [自定义仓库名称] [仓库地址]  # 添加一个远程仓库
```





撤销修改(包括删除文件)

```shell
git restore --staged <file>  # 把暂存区中的修改撤销到工作区(推荐)
git reset HEAD <file>  # 把暂存区中的修改撤销到工作区

git restore <file>  # 删除掉工作区中的修改(推荐)
git checkout -- <file>  # 删除掉工作区中的修改

```

新建的本地仓库连接到新建的远程仓库

```shell
git remote add origin <url>  # 新建的本地仓库连接到新建的远程仓库

git push -u origin master  # 新建的本地仓库推送到新建的远程仓库
```

git中的概念

HEAD：指向当前分支



```shell
git checkout -b <branch>  # 表示创建并切换到新分支
#上面命令相当于
git branch <branch>  # 创建分支
git checkout <branch>  # 切换分支
git merge <branch>  # 将该分支合并到当前分支
git branch -d <branch>  # 删除该分支
git branch -D <branch>  # 强行删除一个没有被合并过的分支
```

查看分支：`git branch`

创建分支：`git branch <branch>`

切换分支：`git checkout <branch>`或者`git switch <branch>`

创建+切换分支：`git checkout -b <branch>`或者`git switch -c <branch>`

合并某分支到当前分支：`git merge <branch>`

删除分支：`git branch -d <branch>`

通常合并分支时，git会用 `Fast forward` 模式，但这种模式下，删除分支后会丢掉分支信息，可以使用`--no-ff`参数使用普通模式合并，合并后的历史有分支，能看出来曾经做过合并。

查看分支合并图：`git log --graph`

其他分支的commit ”复制“到当前分支：`git cherry-pick <commit>`

### 贮藏

把**工作区&暂存区**的内容贮藏到栈上：`git stash`或者`git stash push`

贮藏后工作目录会变成干净的，可以直接切换到任意分支。

查看栈上贮藏的内容：`git stash list`

还原最近的一个贮藏到工作区：`git stash apply`

还原指定某个贮藏到工作区：`git stash apply <stash@{x}>`

上述两条命令无论贮藏的原内容是在工作区还是暂存区，都会被还原到工作区。要想还原到原来一样的位置，需要添加`--index`选项。而且并不会从`stash list`（栈）中删除，要想从栈中删除该贮藏，使用`git stash drop <stash@{x}>`。

恢复并删除栈上的贮藏：`git stash pop`



