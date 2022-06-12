什么是 Node.js？

1. Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
2. Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

在 Chrome 里写 JavaScript 控制浏览器。

Node.js 让你用类似的方式，控制整个计算机。

在node 里写 js 和在 chrome 里写 js 几乎相同。

Node.js 没有浏览器 API ，即 document ，window 等。

加了许多 Node.js API 。

Node能做什么？

1. 服务端渲染

搜索引擎优化+首屏加载优化=服务端渲染

服务端渲染+前后端同构=Node.js

2. 构建工作流
3. Electron

## 代码

`__filename`当前运行的脚本文件的路径。

`__dirname`当前运行脚本文件的目录。

`process`

`process.argv`可以获取命令行输入的值

`exports` 导出的对象与外部 require 的对象是同一个引用。

修改 `module.exports`会把 `exports` 全部覆盖掉

