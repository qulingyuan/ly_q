## 数据类型✅

JavaScript 中共有七种内置类型，这些类型又分为基本类型和引用类型两大类。

基本类型：`Null`，`Undefined`，`Boolean`，`Number`，`String`，`Symbol`，`bigInt`(ES10 新增)。

引用类型：`Object`，`Function`，`Array`等。

## 检测数据类型的方式

1. ### typeof 操作符

检测原始数据类型，`typeof` 可以识别除 `null` 外的所有基本类型，引用类型除 `function` 外全部识别为 `Object`。未定义的变量 `typeof` 返回 `undefined`。

2. ### instanceof

`instanceof` 运算符用来判断构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置。`instanceof` 只能用来判断两个对象是否属于实例关系，但并不能判断一个对象实例具体属于哪种类型。

3. ### constructor

undefined和 null 没有 constructor 属性，且 constructor 指向可以改变。

4. ### Object.prototype.toString().call()



```javascript
function _typeof(obj){
  //对于基本类型，应该用 typeof，因为 call 会触发基本类型的装箱操作，浪费性能。
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

1. #### 隐藏数据/模拟私有变量的实现

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

2. #### 模拟私有变量的实现

```javascript
// 利用闭包生成IIFE，返回 User 类
const User = (function() {
    // 定义私有变量_password
    let _password

    class User {
        constructor (username, password) {
            // 初始化私有变量_password
            _password = password
            this.username = username
        }

       login() {
           // 这里我们增加一行 console，为了验证 login 里仍可以顺利拿到密码
           console.log(this.username, _password)
           // 使用 fetch 进行登录请求，同上，此处省略
       }
    }

    return User
})()

let user = new User('ly', 'pageNotFound')

console.log(user.username)
console.log(user.password)
console.log(user._password)
user.login()
```



3. #### 	偏函数和柯里化

柯里化：是把接受多个参数的函数变换成接受 一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

偏函数：固定你函数的某一个或几个参数，然后返回一个新的函数(这 个函数用于接收剩下的参数)。

柯里化封装函数：

```javascript
//args.length是实参长度，func.length是形参长度
//函数柯里化
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const currysum = curry(sum);

console.log(currysum(1)(2)(3)); //6
console.log(currysum(1)(2, 3)); //6
console.log(currysum(1, 2, 3)); //6
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

## null 和 undefined 区别

`null` 和 `undefined` 都是基本数据类型。

`undefined` 表示未定义，还有在变量声明但未初始化时相当于给变量赋值了 `undefined`。但在 JavaScript 中，`undefined` 只是一个变量，而不是关键字。为避免 `undefined` 被篡改，可使用 `void 0` 安全地获取 `undefined` 值。

`null` 表示一个**空对象指针**。在定义将来要保存对象值的变量时，建议使用 `null` 来初始化。

## 浮点数精度计算

由于二进制不能精确表示所有的整数。

```javascript
console.log( 0.1 + 0.2 === 0.3); //false
```

**检查等式左右两边差的绝对值是否小于最小精度**，才是正确的比较浮点数的方法:

```javascript
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
```

## 装箱

基本类型 `Number`、`String`、`Boolean`、`Symbol` 在对象中都有对应的类。所谓装箱转换，就是把基本类型转换为对应的对象。

`call` 方法的第一个参数为基本类型时，该原始值会被装箱。利用该特性，我们可以来强制装箱：

```javascript
console.log(typeof Symbol('a')); //symbol
var symbolObject = (function(){ return this; }).call(Symbol('a')); 
console.log(typeof symbolObject); //object 
console.log(symbolObject instanceof Symbol); //true 
console.log(symbolObject.constructor === Symbol); //true
```

也可以使用 `Object` 函数显示调用装箱能力。

```javascript
console.log(Symbol('a') instanceof Symbol); //false
console.log(Object(Symbol('a')) instanceof Symbol); //true
```

装箱机制会频繁产生临时对象，应尽量避免。

## 拆箱

拆箱是把对象类型转换为基本类型。

对象到 `String` 和 `Number` 的转换都遵循“先拆箱再转换”的规则。

拆箱转换会尝试调用 `valueOf` 和 `toString` 来**获得拆箱后的基本类型**。到 `Number` 的转换优先调用 `valueOf` 方法；到 `String` 的转换优先调用 `valueOf` 方法。

```javascript
	//转换成 Number，优先调用 valueOf
		var o = {
        valueOf : () => {console.log("valueOf"); return {}},
        toString : () => {console.log("toString"); return {}}
    }

    o * 2
    // valueOf
    // toString
    // TypeError

	//转换成 String，优先调用 toString。
    var o = {
        valueOf : () => {console.log("valueOf"); return {}},
        toString : () => {console.log("toString"); return {}}
    }

   String(o)
    // toString
    // valueOf
    // TypeError
```

`Symbol.toPrimitive` 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数，可使用该函数覆盖原有行为。

```javascript

    var o = {
        valueOf : () => {console.log("valueOf"); return {}},
        toString : () => {console.log("toString"); return {}}
    }
		//toPrimitive 被调用时，会传递一个字符串参数 hint，表示要转换到的原始值的预期类型。
    //hint:"string"|"number"|"default" 
    o[Symbol.toPrimitive] = (hint) => {console.log("toPrimitive"); return "hello"}
    console.log(o + "")
    // toPrimitive
    // hello
```

## 理解 JavaScript 的对象的属性

大多数编程语言中，对象具有三种特征：

- 唯一标识性：即使完全相同的两个对象，也并非同一个对象。一般都是用内存地址来体现的。
- 状态：对象具有状态，同一对象可能处于不同状态之下。
- 行为：对象的状态，可能因为它的行为产生变迁。

对于上述的状态和行为，不同语言的术语不同，C++ 中称它们为“成员变量”和“成员函数”，Java 中则称它们为“属性”和“方法”。在 JavaScript 中，将状态和行为统一抽象为“**属性**”。

JavaScript 中对象独有的特色是：**对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力**。

JavaScript 中的对象有数据属性和访问器属性(getter/setter)两类属性。

### 数据属性

- value：就是属性的值。
- writable：决定属性能否被赋值，默认为 true。
- enumerable：决定 for in 能否枚举该属性，默认为 true。
- configurable：决定该属性能否被删除或者改变特征值，默认为 true。

### 访问器属性

- getter：函数或 undefined，在取属性值时被调用。
- setter：函数或 undefined，在设置属性值时被调用。
- enumerable：决定 for in 能否枚举该属性。
- configurable：决定该属性能否被删除或者改变特征值。

我们通常用于定义属性的代码会产生数据属性，可以使用内置方法`Object.getOwnPropertyDescriptor(obj,props)`查看一个对象的**自有属性**对应的属性描述符（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）：

```javascript

    var o = { a: 1 };
    o.b = 2;
    //a和b皆为数据属性
    Object.getOwnPropertyDescriptor(o,"a") // {value: 1, writable: true, enumerable: true, configurable: true}
    Object.getOwnPropertyDescriptor(o,"b") // {value: 2, writable: true, enumerable: true, configurable: true}
```

要想改变属性的特征，或者定义访问器属性，可以使用 `Object.defineProperty(obj,prop,descriptor)`来定义一个新属性或者修改现有属性。

```javascript

    var o = { a: 1 };
    Object.defineProperty(o, "b", {value: 2, writable: false, enumerable: false, configurable: true});
    //a和b都是数据属性，但特征值变化了
    Object.getOwnPropertyDescriptor(o,"a"); // {value: 1, writable: true, enumerable: true, configurable: true}
    Object.getOwnPropertyDescriptor(o,"b"); // {value: 2, writable: false, enumerable: false, configurable: true}
    o.b = 3;
    console.log(o.b); // 2
```

在创建对象时，也可以使用 `get` 和 `set` 关键字来创建访问器属性:

```javascript
var o = { get a() { return 1 } }; 
console.log(o.a); // 1
Object.getOwnPropertyDescriptor(o,"a")//{get: ƒ a(), set: undefined, enumerable: true, configurable: true}
```

JavaScript 对象的运行时是一个“属性的集合”，是一个**属性的索引结构**。属性以字符串或者 `Symbol` 为 `key`，以数据属性特征值或者访问器属性特征值为 `value`。

### 总结

JavaScript 对象的具体设计：具有高度动态性的属性集合。

## JavaScript原型对象

ES3 之前，“类”的定义是一个私有属性[[class]]，唯一可以访问[[class]]属性的方法是`Object.prototype.toString`。

ES5 开始，[[class]] 私有属性被 `Symbol.toStringTag` 代替，可以使用 `Symbol.toStringTag` 来自定义 `Object.prototype.toString` 的行为：

```javascript
    var o = { [Symbol.toStringTag]: "MyObject" }
    console.log(o + "");//触发 Object.prototype.toString 的调用
		//[object MyObject]
```



`Object.create` 根据指定的原型创建新对象，原型可以是 null；`Object.getPrototypeOf` 获得一个对象的原型；`Object.setPrototypeOf` 设置一个对象的原型。

new 运算接受一个构造器和一组调用参数，实际上做了几件事：

- 以构造器的 prototype 属性（注意与私有字段[[prototype]]的区分）为原型，创建新对象；
- 将 this 和调用参数传给构造器，执行；
- 如果构造器返回的是对象，则返回，否则返回第一步创建的对象。

new 这样的行为，试图让函数对象在语法上跟类变得相似，但是，它客观上提供了两种方式，一是在构造器中添加属性，二是在构造器的 prototype 属性上添加属性。

```javascript

function c1(){
    this.p1 = 1;
    this.p2 = function(){
        console.log(this.p1);
    }
} 
var o1 = new c1;
o1.p2();
//1

function c2(){
}
c2.prototype.p1 = 1;
c2.prototype.p2 = function(){
    console.log(this.p1);
}

var o2 = new c2;
o2.p2();
//1
```

第一种方法是直接在构造器中修改 this，给 this 添加属性。

第二种方法是修改构造器的 prototype 属性指向的对象，它是从这个构造器构造出来的所有对象的原型。

类的写法实际上也是由原型运行时来承载的，逻辑上 JavaScript 认为每个类是有共同原型的一组对象，类中定义的方法和属性则会被写在原型对象之上。

函数对象的定义是：具有[[call]]私有字段的对象，构造器对象的定义是：具有私有字段[[construct]]的对象。

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

## 宏任务和微任务

那么采纳 JSC 引擎的术语，我们把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务。
