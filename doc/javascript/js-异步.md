### 单线程和异步

- JS是单线程语言，只能同时做一件事儿
- 浏览器和 node.js 已支持 JS 启动进程，如Web Worker
- JS和DOM渲染共用同一个线程，因为JS可修改DOM结构





- 遇到等待（网络请求，定时任务）不能卡住
- 需要异步，以为异步不会阻塞代码执行
- 回调 callback 函数形式

### 应用场景

- 网络请求，如 ajax 图片加载
- 定时任务，如 setTimeout
- Promise 解决 callback hell问题

callback本身没问题，Promise 只是用来解决回调地狱的问题。