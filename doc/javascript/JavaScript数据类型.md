## 一、JS类型种类

JavaScript 中共有七种内置类型，这些类型又分为基本类型和引用类型两大类。

基本类型（六种）：`Null`，`Undefined`，`Boolean`，`Number`，`String`，`Symbol`。

引用类型（也称Object对象）：`Object`，`Function`，`Array`等。

## 二、存储位置

基本类型存储在栈内存，被引用或拷贝时，会创建一个完全相等的变量。

引用类型存储在堆内存，存储的是地址，多个引用指向同一个地址，会涉及“共享”的概念。

## 二、检测数据类型的方式

### 1. typeof操作符

typeof 操作符可以区分三种类型的数据：

- 识别所有值类型
- 识别函数
- 判断是否是引用类型（不可再细分）

typeof是操作符而非函数，故不需要使用括号（使用也可以），typeof返回一个表示数据类型的字符串

- "undefined" 表示值为定义；
- "boolean" 表示值为布尔值；
- "string" 表示值为字符串；
- "number" 表示值为数值；
- "symbol" 表示值为符号；
- "function" 表示值为函数；
- "object" 表示值为对象（而不是函数）或 null；

#### 缺点：

基本类型中，typeof 不能判断 null；引用类型中，function 以外的引用类型一律返回 object。

### instanceof

instanceof 用来判断 A 是否为 B 的实例，写做：A instanceof B。**instanceof 运算符用来检测一个对象在其原型链中是否存在一个构造函数的 prototype 属性。**

```javascript
{} instanceof Object; //true
[] instanceof Array; //true
[] instanceof Object; //true
new Date() instanceof Date; //true
new Date() instanceof Object; //true
new RegExp() instanceof RegExp; //true
```

其中，对于数组的类型判断，也可以用 Array.isArray()；

```javascript
Array.isArray([]); //true
```

上面使用 instanceof 能够判断出`[]`是 Array 的实例，同时也是 Object 的实例。三者之间的关系如下：

instanceof 判断出` [].__proto__`指向 Array.prototype，而 `Array.prototype.__proto__`又指向了Object.prototype，最终 `Object.prototype.__proto__`指向了 null，标志着原型链的结束。

从这个案例中我们可以明确一点：**instanceof 只能用来判断两个对象是否属于实例关系，但并不能判断一个对象实例具体属于哪种类型**。

对于基本类型，字面量方式和实例方式创建出来的检测结果不同。

```javascript
2 instanceof Number; // false
new Number(2) instanceof Number; // true
```

通过 new 关键字创建出来的实例才是标准的数据类型 Number 这个类的实例。但是通过字面量创建的变量仍然可以调用 Number 的方法，这是因为 JS 对原始值进行类型包装导致的。

### constructor

call.toString()

附录：

```javascript
let a = {
  name: 'Julia',
  age: 20
}

function change(o) {
  o.age = 24;
  o = {
    name: 'Kath',
    age: 30
  }
  return o;
}

let b = change(a);
console.log(b.age);    // 30
console.log(a.age);    // 24
```

最后b的结果是{name: "Kath", age: 30}；a的结果是{name: "Julia", age: 24}。

原因在于：函数传参进来的 o，传递的是对象在堆中的内存地址值，通过调用 o.age = 24（第 7 行代码）确实改变了 a 对象的 age 属性；12 行把参数 o 的地址重新返回了，将 {name: "Kath", age: 30} 存入其中，最后返回 b 的值就变成了 {name: "Kath", age: 30}。而如果把第 12 行去掉，那么 b 就会返回 undefined。



手动实现 instanceof 方法

```javascript
function myInstanceof(left, right) {
  // 这里先用typeof来判断基础数据类型，如果是，直接返回false
  if(typeof left !== 'object' || left === null) return false;
  // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while(true) {  //循环往下寻找，直到找到相同的原型对象
    if(proto === null) return false;
    if(proto === right.prototype) return true;//找到相同原型对象，返回true
    proto = Object.getPrototypeof(proto);
    }
}
// 验证是否OK
console.log(myInstanceof(new Number(123), Number));    // true
console.log(myInstanceof(123, Number));                // false
```

