

可能触发类型转换的地方

- 字符串拼接
- ==
- if语句和逻辑运算

### 字符串拼接

```javascript
const a = 100 + 10; //110
const b = 100 + "10"; //"10010"
const c = true +"10"; //"true10"
```

### ==运算符

```javascript
100 == "100" //true
0 =="" //true
0 == false //true
false == "" //true
null == undefined //true
```

由于==运算符的转换非常繁杂，容易出错，因此在实际开发中记住一个规则：

**除了`==null`之外，其他一律都用`===`**，例如：

```javascript
const obj = {x:100}
if(obj.a == null){}
//相当于：
//if(obj.a === null || obj.a === undefined){}
```

### if语句和逻辑运算

truly变量：!!a === true 的变量

falsely变量：!!a === false的变量

```javascript
//以下都是falsely变量，除此之外都是truly变量
!!0 === false
!!NaN === false
!!"" === false
!!null === false
!!undefined === false
!!false === false
```

if语句和逻辑运算根据truly变量和falsely变量来判断：

```javascript
console.log(10&&0); //0
console.log("" || "abc"); //"abc"
console.log(!window.abc); //true

console.log(0&&10); //0
console.log("abc" || ""); //"abc"
```

