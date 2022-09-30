

## CommonJS

```javascript
// importing 
const doSomething = require('./doSomething.js'); 

// exporting
module.exports = function doSomething(n) {
  // do something
}
```

CommonJS 是 node 默认的模块管理方式。语法层面使用 `require()`和`module.exports`。

特点：

`CommonJS` 模块输出的是一个值的拷贝(浅拷贝)：一旦输出这个值，模块内部的变化就影响不到这个值了。

`require()`是同步加载模块：`CommonJS`被设计的目的是用在服务端，因此采用同步导入的方式。而浏览器端适合异步。

`CommonJS`是运行时加载：由于加载的是一个对象(module.exports)，只有在脚本运行完才会生成。

## ESM

ES6标准实现的模块管理，浏览器和服务器都能用。语法层面由`export`和 `import`构成。

要使用 ESM，在`script` 标签添加`type="module"`即可，且添加后相当于script标签添加了`defer`属性，会异步加载脚本。

```javascript
<script type="module">
  import {useState} from 'react';
	import * as React from 'react';

</script>
```

特点：

1. ESM 输出的是值的引用：在代码静态解析阶段就会生成。
2. ESM是编译时输出接口。
3. `import` 命令是异步加载，有一个独立的模块依赖的解析阶段。

得益于 `ES6` 的[静态模块结构](https://link.juejin.cn/?target=https%3A%2F%2Fexploringjs.com%2Fes6%2Fch_modules.html%23sec_design-goals-es6-modules)，可以进行 [Tree Shaking](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ffundamentals%2Fperformance%2Foptimizing-javascript%2Ftree-shaking%2F)

`ESM` 允许像 `Rollup` 这样的打包器，[删除不必要的代码](https://link.juejin.cn/?target=https%3A%2F%2Fdev.to%2Fbennypowers%2Fyou-should-be-using-esm-kn3)，减少代码包可以获得更快的加载

可以在 HTML中调用：

```javascript
<script type="module">
  import {func1} from 'my-lib';

  func1();
</script>
```



CJS 不能在浏览器工作，必须经过转换。

AMD(Asynchronous Module Definition)

```javascript
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});
```



```javascript
// "simplified CommonJS wrapping" https://requirejs.org/docs/whyamd.html
define(function (require) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');
    return function () {};
});
```



AMD是异步导入，且最开是的目的是为了前端(CJS是为了后端)。

UMD(Universal Module Definition)

```javascript
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
}));
```



UMD 在前端和后端都适用

不同于 CJS 和 AMD，UMD 更像是一个配置几个模块系统的模式。

当使用 `Rollup/Webpack` 之类的打包器时，`UMD` 通常用作备用模块，比如 react 源码里就有 build 出UMD 的包。

