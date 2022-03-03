



















































## require、export、exports、 module.exports区别

使用场景：

`require`：node 和 ES6 都支持

`export / import` ：只有 ES6 支持

`module.exports / exports` ：只有 node 支持的导出

#### node 模块

node 执行一个文件时，会在文件内生成一个 `exports` 和 `module` 对象。其中 `module` 对象上又存在一个 `exports` 属性。

使用 `require` 导入的内容是 `module.exports` 导出的，即 `module.exports` 表示文件导出的内容，而 `exports` 只是默认指向 `module.exports`指向的同一块内存的引用。

#### ES6 模块

在同一文件中，`export` 可以有多个，但 `export default` 只能有一个。

通过 `export` 方式导出，导入时要加`{}`，`export default` 不需要加。
