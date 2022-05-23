## 什么是 TypeScript

typescript是一个带有类型语法的 JavaScript，是一门静态类型语言。所谓静态类型语言，即在编译阶段确定所有变量的类型的语言；与之相对的是动态类型语言，是在执行阶段确定所有变量的类型的语言，比如 javaScript。

静态类型语言的特点是可以将

## TypeScript的特点

- 类型检查：编译时严格的静态类型检查，
- 语言扩展：增加了比如接口、抽象类、命名空间等。
- 工具属性：TypeScript可以编译成JavaScript，无需任何额外开销。

## ts数据类型概览

- **boolean** 布尔值
- **number** 数字
- **string** 字符串
- **symbol** 
- **null、undefined**
- **object** 对象
- **array** 数组
- **function** 函数

----

- **tuple** 元组
- **enum** 枚举
- **void** 没有任何类型
- **any** 任意值
- **unknown** 不确定的值
- **never** 永不存在的值

其中前五项是 JS 既有的数据类型，后五项是 ts 在 JS 基础上新增的数据类型。

## 类型注解

声明变量时，可以给变量添加类型注解。

作用：相当于强类型语言中的类型声明，可以起到约束变量的作用。

格式：`变量 : 类型`

```typescript
let bool: boolean;
```

## 类型推断

```typescript
let myName = "ly_qu"; //myName被推断为string类型
```



## boolean,number,string,symbol

基本类型，没啥可说的

```typescript
let bool: boolean = true;
let num: number = 123;
let str: string = "abc";
let s1: symbol = Symbol();
num = 456;
num = '123';  //Type 'string' is not assignable to type 'number'.(2322)
```

如果变量类型已经被类型注解指定，则该变量不能被赋值为其他类型。

## null,undefined

默认情况下，`null` 和 `undefined` 是所有类型的子类型，即 `null` 和 `undefined` 可以被赋值给任何类型。将`strictNullChecks`设为 `true` 后，`null`和 `undefined` 只能赋值为他们自身。

```typescript
//strictNullChecks:false(default)
let str: string;
str = null; //yes

---//strictNullChecks:true
str = null;//Type 'null' is not assignable to type 'string'.(2322)
```

## Array

数组有两种定义方式：

- **元素类型后接[]**
- **泛型 Array<元素类型>**

建议使用`元素类型+[]`的方式，在 React中能够避免 JSX 语法冲突。

```typescript
let arr: string[] = ["a","b"];
let arr2: Array<string> = ["a","b"]；
```

## tuple

元组是一种特殊的数组，它确切地知道它包含的元素数量，以及每个索引位置上元素的类型。

```typescript
let tuple: [string,number] = ["a",1];
```

元组本质上是数组，所以可以调用数组的方法如 `push` 方法向元组内添加值，传入的值会使用联合类型约束，但不能访问越界的元素。

```typescript
tuple.push(2);
console.log(tuple); //["a", 1, 2] 
tuple.push(true); 
//Argument of type 'boolean' is not assignable to parameter of type 'string | number'.(2345)
console.log(tuple[2]);
//Tuple type '[string, number]' of length '2' has no element at index '2'.(2493)
```

### 可选元素

元组还可以在元素后使用`?`来声明可选元素，但**可选元素只能出现在元组的末尾**。比如一个表示坐标的元组，为了兼容一维和二维坐标，可以这样声明：

```typescript
type Coordinate = [number, number?, number?];//鼠标放在Coordinate上可以看到，其类型为[number, (number | undefined)?, (number | undefined)?]

const x: Coordinate = [1]; // 一维坐标
const xy: Coordinate = [1, 2]; // 二维坐标
const xyz: Coordinate = [1, 2, 3]; // 三维坐标
console.log(x.length, xy.length, xyz.length); //1,2,3
```

### 剩余元素

元组也可以有剩余元素，但必须是数组/元组类型。一般可用来表示**剩余参数**或 **arguments**。

```typescript
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}
//上面代码相当于
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}
```



## void

在 JS 中，`void`是一个操作符，可以让任何表达式返回 `undefined`。得到 `undefined` 最简单准确的方法是：

```typescript
void 0; //返回 undefined
```

这是因为在 JS 中，`undefined` 并不是一个保留字，它可以被赋值为任何值，可以完全可以通过自定义一个 `undefined` 来覆盖全局的 `undefined`。如：

```javascript
let undefined = 1;
```

在 ts 中，**`void`表示不返回任何值的函数的返回值**。

```typescript
function fun1(){ //fun1 被类型推断为void类型
  console.log(1);
}
function fun2(){	//fun2被推断为void类型
		return;
}
function fun3(): void{ //fun3 虽然返回了 undefined，但指定函数为 void 类型，并不会报错。
  	return undefined;	
}
function fun4(){ // fun4被推断为 undefined 类型
  return undefined;
}
function fun5(): void{
  return 1; //Type 'number' is not assignable to type 'void'.(2322)
}
```

## any

ts 通过 any 类型实现了对 JS 的兼容。ts 中，变量类型没被指定且ts无法推断其类型时，默认为 any 类型。any 类型可以让我们绕过类型检查，可以使用将`noImplicitAny`设置为`true`来避免这种情况。

```typescript
let a; //a是 any 类型
function sum(a,b) {
  return a + b; // OK
}
```

## unknown

用来描述类型不确定的变量，类似于 any，但比 any 类型安全。因为使用unknown类型变量做什么操作都会报错。



## 函数

按照ES6方式定义如下带参函数会报错：

```typescript
let add = （x, y）=> x + y;
//Parameter 'x' implicitly has an 'any' type.
//Parameter 'x' implicitly has an 'any' type.
```

为参数提供类型注解即可，也可以为函数加上返回值类型，不过通常可以省略，因为ts具有类型推断功能。

```typescript
let add = (x: number, y: number): number => x + y;
let add = (x: number, y: number) => x + y;//省略返回值类型
//也可以先定义函数类型再实现
let computed: (x: number, y: number) => number;
//此时编辑器会为我们自动提示参数类型，无需定义具体类型。
computed = (a, b) => a + b;
```

#### 对象

在 JS 中，定义一个object类型，可以随意修改对象的属性，但在ts中，会报错：

```typescript
let obj: object = { x: 1, y: 2 };
ojb.x = 3;
//Property 'x' does not exist on type 'object'.ts(2339)
```

正确的方式是具体定义它应该包含哪些属性：

```typescript
let obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3;
```

#### unknown

描述类型不确定的变量。可以将其理解为更安全的 any。

任意类型的值都可以赋值给 unknown 类型的变量。但 unknown 类型的值只能赋值给 unknown 或 any。

```typescript
function f2(a: unknown) {
  a.b();	//Errors: Object is of type 'unknown'.
}
let unkn: unknown;
unkn = 123; //OK
let a: number = unkn; //Errors: Type 'unknown' is not assignable to type 'number'.
```

缩小类型后，对 unknown 变量即可执行正确的操作：

```typescript
let res: unknown;
res.toFixed(); //Errors: Object is of type 'unknown'.
if(typeof res === "number"){
  	res.toFixed(); //OK
}
```

#### never

never表示永远不会有返回值的类型。常见的有

- 抛出 error 的函数
- 死循环函数

```typescript
let error = () => {
  throw new Error("error");
};
let endless = () => {
  while (true) {}
};
```

never 是所有类型的子类型，可以给所有类型赋值。但除 never 外的所有类型都不能赋值给 never 类型。可利用这一特性禁止写入接口下特定的属性：

```typescript
const ling: {
  age: number,
  name?: never
} = {
    age: 26
};
ling.name = 'ly'; //Errors: Type '"ly"' is not assignable to type 'undefined'.
```

在恒为 false 的类型守卫条件判断下，变量的类型将缩小为 never。

```typescript
const str: string = 'string';
if (typeof str === 'number') {
  str.toLowerCase(); //Errors: Property 'toLowerCase' does not exist on type 'never'.
}
```

#### 类型断言

as

<类型>

第二种在React中与JSX有歧义，推荐第一种。

非空断言 !排除值为 null、undefined 的情况。尽量用类型守卫代替非空断言。

#### 类型推断

