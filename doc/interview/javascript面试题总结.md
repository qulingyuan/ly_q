## 数据类型✅

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

## 作用域✅

**作用域**是程序源代码中定义变量的区域，本质上它是程序**存储和访问变量的规则**。

JavaScript 有三种作用域：

- 全局作用域
- 函数作用域
- 块作用域

JavaScript 采用**词法作用域**，也称静态作用域。

词法作用域的特点是函数的作用域在函数**定义**的时候就决定了，大多数语言都是词法作用域；与之相对的是**动态作用域**，函数的作用域在函数**调用**的时候才决定，如 Bash，Perl 等语言。二者区别就是**划分作用域的时机**。例：

```javascript
var name = 'lingyuan';

function showName() {
    console.log(name);
}

function changeName() {
    var name = 'qu';
    showName();
}

changeName();
//lingyuan
```

执行 `showName` 时，先从 `showName` 函数中查找是否存在局部变量 `name`，如果没有，则根据书写的位置，在上一层作用域内查找，在这个例子中，就是全局作用域，所以输出为 `lingyuan`。

如果是动态作用域，则上面代码会输出 `lingyuan`。

LSH和 RSH 是引擎执行代码时**查询变量**的两种方式。

LSH：变量出现在赋值操作左侧时，意味着变量赋值或写入内存

RSH：变量出现在赋值操作右侧时，意味着变量查找或从内存中读取。

## 执行上下文

执行上下文是当前 JavaScript 代码被解析和执行时所在环境的抽象概念。

JavaScript 标准把一段代码（包括函数），执行所需的所有信息定义为“执行上下文”。

执行栈（调用栈）用于存储在代码执行期间的所有执行上下文。

执行上下文有三种：

- 全局上下文：只有一个，在浏览器中是 `window` 对象。
- 函数上下文：函数被调用时才被创建，每次调用函数都会创建一个新的执行上下文。
- Eval 上下文：运行在 `eval` 函数中的代码，不建议使用。

执行上下文具有以下属性：

- `lexical environment`：词法环境，当获取变量时使用。
- `variable environment`：变量环境，当声明变量时使用。
- `this value`：`this` 值。

每个执行上下文都有会经历两个阶段：

1. 创建阶段：代码执行前的准备工作。
   1、确定 `this` 的值，也被称为 `This Binding`。
   2、`lexical environment`(词法环境)组件被创建。
   3、`variable environment`(变量环境)组件被创建。
2. 执行阶段：逐行执行代码，完成所有变量的分配。

`lexical environment`(词法环境)：

1. 环境记录：存储变量和函数声明的实际位置。有全局环境和函数环境，全局环境 `this` 指向全局对象 `window`，外部环境引用为 `null`。函数环境有 `arguments` 对象
2. 对外部环境的引用：可以访问其外部词法环境。全局环境的外部环境引用为 `null`。

`variable environment`(变量环境)：

变量环境也是一个词法环境，故其具有词法环境的所有属性。区别在于词法环境用于存储**函数声明(函数完成声明)和let、const声明的变量(标记为`uninitialized`)**绑定，而且函数声明在变量声明之前，且如果变量名称和函数名称相同，变量名称不会干扰函数名称；变量环境仅用于存储**var声明的变量(标记为 `undefined`)**绑定。

由上可知，var 的**变量提升**以及 let、const 的**暂时性死区**其实就是由于变量的创建和赋值在执行上下文的不同阶段导致的。函数的声明提升在变量的声明提升之前也是由于词法环境导致的。

```javascript
console.log(foo);//打印函数

var foo = 1;

function foo(){
    console.log("foo");
}

console.log(foo);//输出 1
```

上面例子证明了函数声明在变量声明之前处理，且如果变量名称和函数名称相同，变量名称不会干扰函数名称。

## 闭包

### 定义

闭包其实只是一个**绑定了执行环境的函数**。

从理论上来说，在 JavaScript 中，由于每个函数都存在执行上下文，且执行上下文中都存在**词法环境**，所以JavaScript 中的函数就是闭包。

从实践上来说，有两种类型的函数叫做闭包：

一是引用了**自由变量**的函数是闭包。自由变量是指在函数中没有定义，但在函数中被使用了的变量。

二是即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）。

### 闭包的场景

1. 函数作为参数被传递
2. 函数作为返回值被返回

### 闭包的应用

1. #### 模拟私有变量的实现

```javascript
//闭包隐藏数据，只提供API
function createCache(){
    const data = {}; // 闭包中的数据，被隐藏，不被外界访问
    return {
        set:function(key,val){
            data[key] = val;
        },
        get:function(key){
            return data[key];
        }
    }
}

const c = createCache();
c.set("a",100);
console.log(c.get("a"));
```

2. #### 共享变量



2. #### 偏函数和柯里化

柯里化：是把接受多个参数的函数变换成接受 一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

偏函数：固定你函数的某一个或几个参数，然后返回一个新的函数(这 个函数用于接收剩下的参数)。

柯里化封装函数：

```javascript
//args.length是实参长度，func.length是形参长度
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}
```



堆栈内存

垃圾回收

this 指向

箭头函数

## new 操作符做了什么

`new` 操作符：

1. 首先创建了一个新的空对象
2. 将对象的原型设置为构造函数的 `prototype` 对象
3. 让函数的 `this` 指向这个对象，执行构造函数的代码为对象添加属性。
4. 判断函数的返回值类型，如果是引用类型，则返回该值；否则，返回上面创建的对象。

实现一个具有 new 功能的函数





封装类型

原型

Promise

async/await

手写 new，bind/call/apply，instanceof

事件循环

cookie

localStorage

[垃圾回收](https://segmentfault.com/a/1190000006104910)











































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
