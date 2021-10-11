this有五种使用场景，针对不同场景，this的指向略有不同

### 作为普通函数

在正常模式下指向 window。在严格模式下为 undefined。

```javascript
//作为普通函数被调用
function fn(){
    console.log(this);
}
fn(); // window
```

```javascript
"use strict"
//严格模式
console.log(this);//window
function fn(){
    console.log(this);
}
fn(); // undefined
```



### 使用 call apply bind

指向传入的对象。

```javascript
//call apply bind
function fn1(){
    console.log(this);
}
fn1(); // window
fn1.call({x:100}); // {x:100}
const fn2 = fn1.bind({x:200})
fn2(); // {x:200}
```



### 作为对象方法被调用

一般来说指向当前对象，但要注意特殊情况。

```javascript
const zhangsan = {
    name:"张三",
    sayHi(){
        //this即当前对象
        console.log(this);
    },
    wait(){
        setTimeout(function(){
            //this即window
            console.log(this);
        })
    }
}
zhangsan.sayHi(); // zhangsan
zhangsan.wait(); //window
// 因为该函数是setTimeout本身触发的执行，并非像zhangsan.sayHi()这种方式触发的执行
// 即该函数作为一个普通函数被执行，而不是作为一个函数的方法被执行。
```



### 在class方法中调用

this指向用该类创建的当前对象

```javascript
//class中的this
class People{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    sayHi(){
        console.log(this);
    }
}
const zhangsan = new People("张三");
zhangsan.sayHi(); // zhangsan
```



### 箭头函数

this取其上级作用域的this。

```javascript
//箭头函数
const zhangsan = {
    name:"张三",
    sayHi(){
        //this即当前对象
        console.log(this);
    },
    wait(){
        setTimeout(()=>{
            //this即当前对象
            console.log(this);
        })
    }
}
zhangsan.sayHi(); // zhangsan
zhangsan.wait(); //zhangsan
```

### 结论

**this取何值是在函数执行的时候确定的，不是在函数定义的时候确定的。**

