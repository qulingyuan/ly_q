## 前言

前面的文章里，我们提到过，每个执行上下文中都存在一个`this`。而执行上下文有全局执行上下文、函数执行上下文和 eval 执行上下文三种。我们主要来看看前两种上下文中的 `this`。

## 全局执行上下文中的 `this`

全局执行上下文中的 `this` 指向 `window` 对象，即使是严格模式。

```javascript
"use strict"
console.log(this); //window
```

## 函数执行上下文中的 `this`

### 普通函数

在**全局环境**中调用一个函数，其执行上下文中的 `this` 默认指向全局对象 `window` 。

```javascript
function f(){
  console.log(this);
}
f(); // window
```

严格模式下，`this` 为 `undefined`。

```javascript
"use strict"
function f(){
  console.log(this);
}
f(); // undefined
```

### 对象方法

通过对象调用方法，则 `this` 指向该对象。

```javascript
var obj = {
  name : "ly_qu", 
  showThis: function(){
    console.log(this)
  }
}
obj.showThis();
```

**使用对象来调用其内部的一个方法，该方法的 this 是指向对象本身的**。

改造一下上面的代码:

```javascript
var obj = {
  name : "ly_qu", 
  showThis: function(){
    console.log(this)
  }
}
var foo = obj.showThis;
foo(); // window
```

此时又变成了第一种情况，即在全局环境中调用函数， `this` 指向 `window`。

### call、bind、apply

通过`call`等方法可以改变 `this` 指向：

```javascript
let obj = {
  myName: "ly_qu",
  age: 26
}
function f(){
  this.myName = "Page_not_found"
}
foo.call(g)
console.log(g)
console.log(myName)
```

### 构造函数

先解释一下`new` 操作符执行的操作：

1. 在内存中创建一个新对象。该对象内部的`[[Prototype]]`属性被赋值为构造函数的`prototype`属性。
2. 构造函数内部的 `this` 被赋值为这个新对象。
3. 执行构造函数内部的代码（给新对象添加属性）
4. 如果构造函数没有显式返回一个对象类型的值，则返回上面创建的新对象。

因此在构造函数中`this`指向新构建的实例对象。

### 箭头函数

由于箭头函数没有自己的执行上下文，故箭头函数会继承其上级作用域的 `this`。

## this 的问题

**嵌套函数中的 `this` 不会从外层函数中继承**。

```javascript
var obj = {
  name : "ly_qu", 
  showThis: function(){
    console.log(this)
    function bar(){console.log(this)}
    bar()
  }
}
obj.showThis(); //window
```

有两种方式来解决这个问题：

1. 在函数`showThis`中声明一个变量来保存 `this`，在函数 `bar` 中使用该变量：

```javascript
var obj = {
  name : "ly_qu", 
  showThis: function(){
    console.log(this)
    const self = this
    function bar(){console.log(self)}
    bar()
  }
}
obj.showThis(); 
```

2. 箭头函数会继承调用函数的 `this`，利用这个特点来解决问题：

```javascript
var obj = {
  name : "ly_qu", 
  showThis: function(){
    console.log(this)
    const self = this
    bar = ()=>{console.log(self)}
    bar()
  }
}
obj.showThis(); 
```

## 总结

`this`是与执行上下文绑定的，执行上下文有全局、函数、eval 三种。

函数被正常调用时，`this`指向全局 `window` 对象；严格模式下，`this` 值为 `undefined`。

函数作为对象方法调用时，`this` 值是该对象。

构造函数中的 `this` 指向新创建的对象。

箭头函数的 `this` 继承其上层函数的 `this`。

嵌套函数中的 `this` 不会从外层函数中继承。
