### 原始值包装类型

为了方便操作原始值，ECMAScript提供了三种特殊的引用类型：Boolean、Number 和 String。这些类型具有其他引用类型一样的特点，但也具有原始类型对应的特殊行为。每当**用到某个原始值的方法或属性**时，后台都会创建一个相应**原始包装类型的对象**，从而暴露出操作原始值的各种方法。



```javascript
let s1 = "some text";
let s2 = s1.substring(2);
```

分析：

s1是原始值，原始值不是对象，因此不应该存在substring()方法，上面代码能够按照预期执行是因为后台做了很多处理。当第二行访问s1的时候，是以**「读模式」**访问的，也就是从内存中读取变量保存的值。以读模式访问字符串值的时候，后台都会执行下面三步：

1. <u>创建一个String类型的实例</u>
2. <u>调用实例上的特定方法</u>
3. <u>销毁实例</u>

用代码可以表述为：

```javascript
let s1 = new String("some text");
let s2 = s1.substring(2);
s1 = null;
```

**引用类型**与**原始值包装类型**的主要区别在于**对象的生命周期**。通过new实例化引用类型后，得到的实例会在**离开作用域时被销毁**。而自动创建的原始值包装对象**只存在于访问它的那行代码执行期间**。这意味着**不能在运行时给原始值添加属性和方法。**

例如:

```javascript
let s1 = "some text";
s1.color = "red";
console.log(s1.color);  //undefined
```

可以显式地使用Boolean、Number、和String构造函数创建原始值包装对象。在原始值包装类型的实例上调用typeof会返回"object"，所有原始值包装对象都会转换为布尔值true。

Object构造函数作为一个工厂方法，能够根据传入值的类型返回相应原始值包装类型的实例。例如：

```javascript
let obj = new Object("some text");
console.log(obj instanceof String);  //true
```

使用new调用原始值包装类型的构造函数，与调用同名的转型函数并不一样。例如：

```javascript
let value = "25";
let number = Number(value);  //转型函数
console.log(typeof number);  //"number"
let obj = new Number(value);  //构造函数
console.log(typeof obj);  //"object"
```

上面例子中，变量number中保存的是一个值为25的原始数值，而变量obj中保存的是一个Number的实例。（例子很重要）

