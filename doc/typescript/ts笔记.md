undefined 值或类型是 undefined 的变量赋值给 void 类型变量，反过来，类型是 void 但值是 undefined 的变量不能赋值给 undefined 类型。

never 是所有类型的子类型

unknown一般配合类型缩小(Type Narrowing)使用。

类型断言：

1. `xx as type`

```
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;
```

2. `<type>`

```
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = <number>arrayNumber.find(num => num > 2);
```

避免与 JSX 冲突，推荐 as。

any 和 unknown 这两个特殊类型属于万金油，因为它们既可以被断言成任何类型，反过来任何类型也都可以被断言成 any 或 unknown。

建议使用类型首尾来替代非空断言`!.`。