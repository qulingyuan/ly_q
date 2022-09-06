记录一下 `nvm` 的基本使用。电脑是基于M1 pro的MacBook。

## HomeBrew

HomeBrew 是一个 Mac/Linux的包管理器。通过命令行的方式安装各类软件，[官网地址](https://brew.sh/)。

安装方式：按照官方提供的命令行安装即可。

基本使用：官网直接搜索想要安装的软件，复制安装命令即可。

## nvm

`node` 版本管理工具。可以十分简单的对 `node` 版本进行管理和切换。强烈建议安装 `nvm`，然后通过 `nvm` 的方式安装 `node`，便于管理。

安装方式：`brew install nvm`

常用命令：

- `nvm install node`：安装最新版本的 `node`。
- `nvm install [<version>]`：安装指定的 `node` 版本。
- `nvm ls`：查看已安装的`node` 版本列表。
- `nvm uninstall <version>`：卸载指定的 `node` 版本。
- `nvm use <version>`：切换指定的 `node` 版本（临时）。
- `nvm alias default <version>`：切换默认的 `node` 版本（永久）。

注意：`nvm use <version>`切换版本的方式只在当前命令行环境内生效，改变的是当前命令行使用 `node`命令的版本，但凡开启了一个新的命令行或者关闭了当前的命令行后重新打开命令行，`node`的版本都会恢复成`default`版本。而想要真正全局切换`node`版本，应该使用`nvm alias default <version>`命令。

请看操作：

当前我的 `default` 版本以及 `nvm` 指定的 `node` 版本都是 v12。
![image-20220618181954839](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202206181820729.png)

然后使用 `nvm use 16`切换到 v16：

![image-20220618182135784](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202206181821823.png)

可以发现，nvm 当前指向的版本是 v16，但default版本仍然是 v12。

此时我们再打开一个新的终端窗口，查看 node 版本：

![image-20220618182534134](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202206181825166.png)

可以发现在另一个终端里`node` 版本并没有改变，这就印证了`nvm use`命令只能改变当前所处命令行的 `node` 版本。想要在每个终端都改变 `node` 的版本，就需要使用`nvm alias default <version>`命令了，记住改完后新开一个终端：

![image-20220618183418492](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202206181834521.png)

这样就将 `node` 版本永久切换了。
