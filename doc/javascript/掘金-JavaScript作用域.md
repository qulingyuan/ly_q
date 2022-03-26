# 作用域

**作用域**是程序源代码中定义变量的区域，本质上它是程序**存储和访问变量的规则**。

JavaScript 有三种作用域：

- 全局作用域
- 函数作用域
- 块作用域

JavaScript 采用**词法作用域**，也称静态作用域。

## 词法作用域 vs 动态作用域

现代编程语言中，有两种作用域模型：此法作用域和动态作用域，二者区别在于**划分作用域的时机**。

- 词法作用域：也称静态作用域，特点是函数的作用域在函数**定义**的时候就决定了，作用域链沿着它**定义的位置**往外延伸。大多数语言都是词法作用域（包括 js）。

- 动态作用域：特点是函数的作用域在函数**调用**的时候才决定，作用域链沿着它的**调用栈**往外延伸。相对冷门，如Bash脚本，Perl等。


```javascript
var name = 'ling';

function showName() {
    console.log(name);
}

function changeName() {
    var name = 'qu';
    showName();
}

changeName();
//ling
```

执行过程：

执行 `showName` 时，先从 `showName` 函数中查找是否存在局部变量 `name`，如果没有，则根据**书写的位置**，在上一层作用域内查找，在这个例子中，就是全局作用域，所以输出为 `lingyuan`。

如果是动态作用域，则上面代码会输出 `lingyuan`。

作用域关系图如下图所示：

![作用域图](https://gitee.com/qulingyuan/ly_picture/raw/master/img/%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%9B%BE.png)

运行时的作用域链关系如下：

![作用域链](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022/01/作用域链.png)

遇到问题最好像上面这样画作用域图来进行分析。

## LSH vs RSH

LSH和 RSH 是引擎执行代码时**查询变量**的两种方式。

LSH：变量出现在赋值操作左侧时，意味着**变量赋值或写入内存**。

RSH：变量没有出现在赋值操作左侧时，意味着**变量查找或从内存中读取**。

```javascript
name = 'ling'; //LSH
let me = name; //RSH
conosle.log(name); //RSH
```

分析：

第一行，`name` 位于赋值运算符左侧，属于 LSH；第二行，`name` 出现在赋值运算符右侧，属于 RSH；第三行，从内存中读取 `name`，也属于 RSH。
