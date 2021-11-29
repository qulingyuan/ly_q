### TypeScript数据类型

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

其中前五项是 JS 既有的数据类型，后五项是 TS 在 JS 基础上新增的数据类型。

#### 原始类型

```typescript
let bool: boolean = true;
let num: number = 123;
let str: string = "abc";
```

#### symbol

表示唯一的标识。

```typescript
let s1: symbol = Symbol();
let s2 = Symbol();
```

#### 数组

两种定义方式：

- **元素类型后接[]**
- **泛型 Array<元素类型>**

```typescript
const arr1: number[] = [1, 2, 3];
const arr2: Array<number> = [1, 2, 3];
const arr3: Array<number | string> = [1,2,"a"];
```

#### 元组

元组是一种特殊的数组，限定了数组元素的类型和个数。

```typescript
let tuple: [string,number] = [1,"a"];
```

元组可以调用数组的方法，传入的值会使用联合类型约束，但不能访问越界的元素。

```typescript
tuple.push(2);
console.log(tuple); //(3) [0, '1', 2]
tuple.push(true); 
//Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
console.log(tuple[2]);
//TS2493: Tuple type '[number, string]' of length '2' has no element at index '2'.
```

#### 函数

按照ES6方式定义如下带参函数会报错：

```typescript
let add = （x, y）=> x + y;
//Parameter 'x' implicitly has an 'any' type.
//Parameter 'x' implicitly has an 'any' type.
```

为参数提供类型注解即可，也可以为函数加上返回值类型，不过通常可以省略，因为TS具有类型推断功能。

```typescript
let add = (x: number, y: number): number => x + y;
let add = (x: number, y: number) => x + y;//省略返回值类型
//也可以先定义函数类型再实现
let computed: (x: number, y: number) => number;
//此时编辑器会为我们自动提示参数类型，无需定义具体类型。
computed = (a, b) => a + b;
```

#### 对象

在 JS 中，定义一个object类型，可以随意修改对象的属性，但在TS中，会报错：

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

#### undefined、null

这两种类型的变量只能赋值为他们自身。默认情况下，TS认为undefined 和 null 可以赋值给任何其他类型。可以通过配置 `strictNullChecks:true`来规避这个问题。

#### void

在 JS 中，void是一个操作符，可以让任何表达式返回 undefined。得到 undefined 最简单准确的方法是：

```typescript
void 0; //返回 undefined
```

因为在 JS 中，undefined 并不是一个保留字，它可以被赋值为任何值，可以通过自定义一个 undefined 来覆盖全局的 undefined。

在 TS 中，void表示不返回任何值的函数的返回值，undefined 可以赋值给 void。

```typescript
function noop(){	//noop是void类型
		return;
}
function noop(): void{
  	return undefined;	//OK
}
const noReturn = () => {};
```

#### any

TS 中，变量类型没被指定则默认为 any，TS 通过 any 类型实现了对 JS 的兼容。

```typescript
function f1(a: any) {
  a.b(); // OK
}
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

