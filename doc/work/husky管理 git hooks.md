# git hooks

git 提供了在特定的动作发生时触发的自定义脚本，这些脚本分为两大类：客户端和服务器端的。

服务器端勾子包含 `push` 相关的操作；客户端勾子包含 `commit` 相关的操作。客户端的 `hooks` 存储在仓库的`.git/hooks` 文件夹里。

![image-20220221101230345](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022/02/202202211012461.png)

如上图所示，这些 hooks 默认都会以 `.sample` 结尾，去掉 `.sample` 勾子才能生效。

## 执行时机

一般来说，以 `pre` 开头的勾子都是在该操作之前执行，以 `post` 开头的勾子都是在该操作之后执行。例如 `pre-commit` 会在提交动作之前执行，`post-commit` 会在提交动作之后执行。

[所有的 `git hooks`](https://git-scm.com/docs/githooks)

# husky

husky 是一个 `git hooks` 管理工具，支持所有 `git hooks` 。

## 安装使用 husky

1. 安装 husky

```shell
npm install husky --save-dev
```

这时 `package.json` 文件中已经存在 `husky`：

```json
//package.json
"devDependencies": {
	...
  "husky": "^7.0.4"
},
```

2. 使得 `git hooks` 生效

```shell
npx husky install
```

但更推荐使用以下命令，安装后自动让 `git hooks` 生效：

```shell
npm set-script prepare "husky install"
```

这时 `package.json` 文件中会多出一个 `prepare` 脚本

```json
// package.json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

## 创建 hooks

使用`npx husky add <file> [cmd]`创建hooks，例如：

```shell
npx husky add .husky/pre-commit "npm test"
```

也可以不写后面的 `cmd` 命令，自己写一个 `node.js` 脚本：

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 上面的代码是自动生成的，我们添加执行 node 脚本的命令如下
node imglint.js
```

这里我们编写一个脚本，每次提交时检测提交的文件中是否存在大于10kb 的图片，如果存在，则中断提交，并自动上传到远端服务器；否则，正常提交代码。编写 `imglint.js`如下：

```javascript
const fs = require('fs');
const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);

/*
* 该脚本只针对 git 新增的文件进行处理，重命名以及内容更改的文件，不作处理*/

childProcess.execSync('git config core.quotepath false');
const commitFile = childProcess.execSync('git diff --cached --name-status').toString('utf-8').trim();
const commitFileArray = commitFile.split('\n');

const structResultArray = [];
const commandsArray = [];
commitFileArray.forEach(item => {
    if (item.startsWith('A\t')) {
        const filePath = item.substring(2);
        const zhReg = new RegExp(/[\u4e00-\u9fa5]/g);
        if (zhReg.test(filePath)) {
            console.log('\x1B[31mError Info: 您提交的文件命名存在中文，请修改文件名称！\x1B[0m');
            process.exit(1);
        }
        const picReg = new RegExp(filePath.startsWith('src/Images/') ? /\.(png|jpe?g|gif|svg|json)$/g : /\.(png|jpe?g|gif|svg)$/g);
        const fileSize = (fs.statSync(__dirname + '\/' + filePath).size / 1024).toFixed(0);
        if (picReg.test(filePath) && fileSize >= 10) {
            const fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.length);
            commandsArray.push({
                command: `curl -H 'X-Auth-Token: <token>' -T '${filePath}' 'http://example.com/release/urlname/deploy?hostname=example.com&pathname=/zt/app/train/${fileName}'`,
                sourceFilePath: filePath, size: fileSize, fileName: fileName,
            });
        }
    }
});

if (commandsArray.length > 0) {
    console.log('\x1B[31mError Info: 以下图片的大小超过 10kB，些图片上传到静态资源网站，请删除图片并使用对应的 upload url 替换该图片的本地引用，重新提交代码\x1B[0m');

    Promise.allSettled(commandsArray.map(item => exec(item.command))).then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                structResultArray.push({
                    'source file': commandsArray[index].sourceFilePath,
                    'upload url': `https://example.com/zt/app/train/${commandsArray[index].fileName}`,
                    'size(kb)': commandsArray[index].size,
                    status: 'success',
                });
            }
            if (result.status === 'rejected') {
                structResultArray.push({
                    'source file': commandsArray[index].sourceFilePath,
                    'upload url': '---------------------------',
                    'size(kb)': commandsArray[index].size,
                    status: 'failed',
                });
            }
        });
        console.table(structResultArray);
        process.exit(1);
    });
} else {
    process.exit(0);
}
```

在写上面脚本的过程中，使用了 crul这个命令行工具，对这个工具进行了一定的学习了解，个人感觉就是命令行版的 postman，很强大。

本人是第一次写node 脚本，不足之处，欢迎指出。

最后附上 `commit` 图片时的效果图：

![image-20220221110223697](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022/02/202202211102768.png)

附录：

[husky官网](https://typicode.github.io/husky/#/)

[all git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

[git hooks](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)