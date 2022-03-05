## 数据类型

JavaScript 中共有七种内置类型，这些类型又分为基本类型和引用类型两大类。

基本类型：`Null`，`Undefined`，`Boolean`，`Number`，`String`，`Symbol`，`bigInt`(ES10 新增)。

引用类型：`Object`，`Function`，`Array`等。

## 检测数据类型的方式

1. ### typeof 操作符

检测原始数据类型，`typeof` 可以识别除 `null` 外的所有基本类型，引用类型除 `function` 外全部识别为 `Object`。

2. ### instanceof

`instanceof` 运算符用来判断构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置。`instanceof` 只能用来判断两个对象是否属于实例关系，但并不能判断一个对象实例具体属于哪种类型。

3. ### constructor

undefined和 null 没有 constructor 属性，且 constructor 指向可以改变。

4. ### Object.prototype.toString().call()



```javascript
function _typeof(obj){
  var s = Object.prototype.toString.call(obj);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

_typeof([12,3,343]);
"array"
```



## 闭包

堆栈内存

垃圾回收

this 指向

箭头函数

new 操作符

封装类型

原型

Promise

async/await

手写 new，bind/call/apply，instanceof

事件循环

cookie

localStorage











































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
