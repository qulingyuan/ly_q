前面的文章里，我们提到过，每个执行上下文中都存在一个`this`。而执行上下文有全局执行上下文、函数执行上下文和 eval 执行上下文三种。我们主要来看看前两种上下文中的 `this`。

全局执行上下文中的 `this`

全局执行上下文中的 `this` 指向 `window` 对象，即使是严格模式。

```javascript
"use strict"
console.log(this); //window
```

函数执行上下文中的 `this`

普通函数

在默认情况下调用一个函数，其执行上下文中的 `this` 默认指向全局对象 `window` 。

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

对象方法

通过对象调用方法，则 `this` 指向该对象。

```javascript
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
  }
}
myObj.showThis()
```

**使用对象来调用其内部的一个方法，该方法的 this 是指向对象本身的**。

call、bind、apply

通过call等方法可以改变 this 指向：

```javascript
let bar = {
  myName : " 极客邦 ",
  test1 : 1
}
function foo(){
  this.myName = " 极客时间 "
}
foo.call(bar)
console.log(bar)
console.log(myName)
```

构造函数

在构造函数中this指向新构建的实例对象。



嵌套函数中的 this 不会从外层函数中继承。

```javascript
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    function bar(){console.log(this)}
    bar()
  }
}
myObj.showThis()
```

