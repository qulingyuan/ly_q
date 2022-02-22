## 作用域

讲闭包前，先谈作用域，因为闭包是作用域的特殊情况。

### js 的作用域

js 有三种作用域

- 全局作用域
- 函数作用域
- 块级作用域（ES6新增）

作用域嵌套作用域，在内层作用域找不到的变量，js 引擎会向上层作用域寻找，就此形成了**作用域链**。

### 作用域模型

有两种作用域模型：词法作用域和动态作用域，二者的区别在于**划分作用域的时机**：

**词法作用域**：也成为静态作用域。在代码书写的时候完成划分，作用域链沿着它**定义的位置**向外延伸。大多数语言都属于该模型（包括 js）。

**动态作用域**：在代码运行时完成划分，作用域链沿着它的**调用栈**向外延伸。比较冷门，Bash、Perl 等语言采用该模型

先思考一下，下面代码的输出结果是什么？

```javascript
var name = 'ly_qu';

function showName() {
    console.log(name);
}

function changeName() {
    var name = 'chen';
    showName();
}

changeName();
```

分析：

在 showName 函数的函数作用域内查找是否有局部变量 name。

没有找到 name，根据 showName **定义的位置**，查找其上层作用域，即全局作用域，找到了 name 的值是 ly_qu，所以结果是 ly_qu。

作用域关系图如下图所示：

![作用域图](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022/01/%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%9B%BE.png)

运行时的作用域链关系如下：

![作用域链](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022/01/%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE.png)

遇到问题最好像上面这样画作用域图来进行分析。

## 闭包

不属于当前作用域的变量，对于当前作用域来说是一个**自由变量**。

**引用了自由变量的函数叫闭包。**

闭包有两种表现形式：

- 函数作为参数被传递
- 函数作为返回值被返回

来看两个例子：

```javascript
//函数作为返回值
function create(){
    let a = 100;
    return function(){
        console.log(a);
    }
}
const fn = create();
const a = 200;
fn(); // 100

//函数作为参数被传递
function print(fn){
    let a = 200;
    fn();
}
const a = 100;
function fn(){
    console.log(a);
}
print(fn); // 100
```

**结论**：所有的自由变量的查找，是在**函数定义**的地方向上级作用域查找，不是在执行的地方！！！



### 循环体与闭包

经典问题，下面代码运行结果是什么？

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}

console.log(i);
```

结果是：

```
5 
5 5 5 5 5
```

分析：

首先，最后一行肯定最先输出，所以先输出一个 5。

for 循环里的 setTimeout 执行了 5 次，每次都会将这个函数的执行推迟 1000ms

```javascript
function() {
  console.log(i);
}
```

但该函数内并不存在变量 i，所以需要向上层作用域找。但此时 for 循环早已执行完毕，变量 i 值已经是 5了，故输出了 5 个 5。

#### 改造上面代码

1. 利用 setTimeout 第三个参数。

   ```javascript
   for (var i = 0; i < 5; i++) {
       setTimeout(function(j) {
           console.log(j);
       }, 1000, i);
   }
   ```

   

2. 在 setTimeout 外面再套一层函数，利用该外部函数的入参来缓存每一个循环中的 i 值。

   ```javascript
   var output = function (i) {
       setTimeout(function() {
           console.log(i);
       }, 1000);
   };
   
   for (var i = 0; i < 5; i++) {
       // 这里的 i 被赋值给了 output 作用域内的变量 i
       output(i);  
   }
   ```

   

3. 使用立即执行函数把 setTimeout 套起来，利用立即执行函数的入参来缓存每一个循环中的 i 的值：

   ```javascript
   for (var i = 0; i < 5; i++) {
       // 这里的 i 被赋值给了立即执行函数作用域内的变量 j
       (function(j) {  
           setTimeout(function() {
               console.log(j);
           }, 1000);
       })(i);
   }
   ```

### 闭包的应用

实际开发中，我们主要利用闭包实现数据隐藏以及数据共享。

1. #### 模拟私有变量的实现

```javascript
// 利用闭包生成IIFE，返回 User 类
const User = (function() {
    // 定义私有变量_password
    let _password;

    class User {
        constructor (username, password) {
            // 初始化私有变量_password
            _password = password;
            this.username = username;
        }
      
       login() {
           console.log(this.username, _password);
       }
    }

    return User;
})()

let user = new User('ly_qu', 'ly123')

console.log(user.username);  //ly_qu
console.log(user.password);  //undefined
console.log(user._password);  //undefined
user.login(); //  ly_qu ly123
```

user实例组成如下：

![image-20220112171339883](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022/01/image-20220112171339883.png)

如图，已经成功模拟了私有变量。

2. #### 偏函数与柯里化

柯里化：是把**接受 n 个参数的 1 个函数**改造为**只接受 1个参数的 n 个互相嵌套的函数**的过程。也就是 `fn (a, b, c)` 会变成 `fn (a)(b)(c)`。

偏函数：固定你函数的某一个或几个参数，然后返回一个新的函数(这个函数用于接收剩下的参数)。

通用的柯里化封装函数（面试常考）：

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

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6，仍然可以被正常调用
alert( curriedSum(1)(2,3) ); // 6，对第一个参数的柯里化
alert( curriedSum(1)(2)(3) ); // 6，全柯里化
```

3. #### 共用变量

例子：

```javascript
//创建10个<a>标签，点击的时候弹出对应的序号
//错误写法案例
let i,a;
for(i = 0;i < 10;i++){
    a = document.createElement("a");
    a.innerHTML = i+"<br>";
    a.addEventListener("click",function(e){
        e.preventDefault();
        alert(i);
    })
    document.body.appendChild(a);
}
```

上面代码，不能实现功能。因为 `i` 定义在全局，for 循环执行很快，而 addEventListener 可能在数秒后才触发点击事件。所以最后 `addEventListener` 中的 `i` 已经变成了 `10`；

正确写法应该是把 `i` 放入到 for 循环的块作用域中，这样就保证了每次 `addEentListener` 中的 `i` 都是每次循环的 `i` 的值。

```javascript
//创建10个<a>标签，点击的时候弹出对应的序号
//正确写法
let a;
for(let i = 0;i < 10;i++){
    a = document.createElement("a");
    a.innerHTML = i+"<br>";
    a.addEventListener("click",function(e){
        e.preventDefault();
        alert(i);
    })
    document.body.appendChild(a);
}
```

4. #### 隐藏数据

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

