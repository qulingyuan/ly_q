修改 module.exports 会把所有的 exports 给覆盖掉。

在命令行键入node命令，后面没有文件名，就进入一个Node.js的REPL环境（Read–eval–print loop，”读取-求值-输出”循环），可以直接运行各种JavaScript命令。

Node约定，如果某个函数需要回调函数作为参数，则回调函数是最后一个参数。另外，回调函数本身的第一个参数，约定为上一步传入的错误对象。

因为回调函数主要用于异步操作，当回调函数运行时，前期的操作早结束了，错误的执行栈早就不存在了，传统的错误捕捉机制try…catch对于异步操作行不通，所以只能把错误交给回调函数处理。

Node提供两个全局变量，都以两个下划线开头。

- `__filename`：指向当前运行的脚本文件名。
- `__dirname`：指向当前运行的脚本所在的目录。

Node.js采用模块化结构，按照[CommonJS规范](http://wiki.commonjs.org/wiki/CommonJS)定义和使用模块。模块与文件是一一对应关系，即加载一个模块，实际上就是加载对应的一个模块文件。

require命令用于指定加载模块，加载时可以省略脚本文件的后缀名。

```javascript
var circle = require('./circle.js');
// 或者
var circle = require('./circle');
```

require方法的参数是模块文件的名字。它分成两种情况，第一种情况是参数中含有文件路径（比如上例），这时路径是相对于当前脚本所在的目录，第二种情况是参数中不含有文件路径，这时Node到模块的安装目录，去寻找已安装的模块（比如下例）。

有时候，一个模块本身就是一个目录，目录中包含多个文件。这时候，Node在package.json文件中，寻找main属性所指明的模块入口文件。

```
{
  "name" : "bar",
  "main" : "./lib/bar.js"
}
```

上面代码中，模块的启动文件为lib子目录下的bar.js。当使用`require('bar')`命令加载该模块时，实际上加载的是`./node_modules/bar/lib/bar.js`文件。下面写法会起到同样效果。

```
var bar = require('bar/lib/bar.js')
```

如果模块目录中没有package.json文件，node.js会尝试在模块目录中寻找index.js或index.node文件进行加载。

模块一旦被加载以后，就会被系统缓存。如果第二次还加载该模块，则会返回缓存中的版本，这意味着模块实际上只会执行一次。如果希望模块执行多次，则可以让模块返回一个函数，然后多次调用该函数。

module变量是整个模块文件的顶层变量，它的exports属性就是模块向外输出的接口。

Node有三种方法，传播一个错误。

- 使用throw语句抛出一个错误对象，即抛出异常。
- 将错误对象传递给回调函数，由回调函数负责发出错误。
- 通过EventEmitter接口，发出一个error事件。

```javascript
#!/usr/bin/env node
```

作为命令行脚本时，`console.log`用于输出内容到标准输出，`process.stdin`用于读取标准输入，`child_process.exec()`用于执行一个shell命令。