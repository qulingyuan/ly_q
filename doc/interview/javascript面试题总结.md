## require、export、exports、 module.exports区别

使用场景：

`require`：node 和 ES6 都支持

`export / import` ：只有 ES6 支持

`module.exports / exports` ：只有 node 支持的导出

#### node 模块

node 执行一个文件时，会在文件内生成一个 `exports` 和 `module` 对象。其中 module 对象上又存在一个 `exports` 属性。

使用 `require` 导入的内容是 `module.exports` 导出的，而 `exports` 只是默认指向 `module.exports`。
