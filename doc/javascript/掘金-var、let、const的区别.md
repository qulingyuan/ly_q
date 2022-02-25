# var、let、const

## 区别

- var 声明的范围是函数作用域；let 声明的范围是块作用域。
- var 声明会自动提升至作用域顶部，可以重复使用 var 声明同一个变量；let 声明的变量不能在声明前使用，且不可重复声明。
- var 在全局作用域中声明的变量会成为 window 对象的属性；let 声明则不会。
- var 在 for 循环中会渗透到循环体外部；let 不会。
- const 与 let 基本相同，区别是 const 声明的变量必须初始化，而且 const 的声明只应用到顶级原语或者对象。换句话说，const 不能再被重新赋值为其他引用值，但对象的键则不受限制。

| 区别               | var  | let  | const |
| ------------------ | ---- | ---- | ----- |
| 是否有块级作用域   | ×    | ✅    | ✅     |
| 是否存在变量提升   | ✅    | ×    | ×     |
| 是否添加全局属性   | ✅    | ×    | ×     |
| 能否重复声明变量   | ✅    | ×    | ×     |
| 是否存在暂时性死区 | ×    | ✅    | ✅     |
| 是否必须设置初始值 | ×    | ×    | ✅     |
| 能否改变指针指向   | ✅    | ✅    | ×     |

#### 最佳实践：

1. 不使用var
2. const优先，let次之

### 常见题目

```javascript
function sayHi() {
  phrase = "Hello"; // (*)

  if (false) {
    var phrase;
  }

  alert(phrase);
}
sayHi();
```

上面代码相当于下面的代码

```javascript
function sayHi() {
  var phrase;
  phrase = "Hello"; // (*)

  alert(phrase);
}
sayHi();
```



## IIFE

`IIFE `叫做立即执行函数 (immediately-invoked function expressions)。

由于 ES6 以前只有 var 声明方式，而 var 声明方式没有会计作用于，所以我们经常会使用 IIFE 来模仿块级作用域。使用方式如下：

```javascript
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

