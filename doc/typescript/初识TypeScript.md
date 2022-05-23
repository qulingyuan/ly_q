## 什么是 TypeScript

typescript是一个带有类型语法的 JavaScript，是一门静态类型语言。

静态类型语言：在编译阶段确定所有变量的类型

动态类型语言：在执行阶段确定所有变量的类型

## TypeScript的特点

- 类型检查：编译时严格的静态类型检查，
- 语言扩展：增加了比如接口、抽象类、命名空间等。
- 工具属性：TypeScript可以编译成JavaScript，无需任何额外开销。

## 基础类型

number，string，boolean是基础类型

## undefined 和 null

默认情况下，undefined 和 null是其他类型的子类型



值得注意的是，方法没有返回值将得到`undefined`，但是我们需要定义成`void`类型，而不是`undefined`类型。否则将报错:

```
function fun(): undefined {
  console.log("this is TypeScript");
};
fun(); // Error
```

npm v3之前，包管理是嵌套的，有两个问题：

1. 依赖树的层级太深，会在 Windows 上引发目录路径过长的问题。
2. 在一个node_module中同一个包可能会有多个副本存在。

