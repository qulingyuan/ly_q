### 动态类型语言 vs 静态类型语言

静态类型语言：在编译阶段确定所有变量的类型

动态类型语言：在执行阶段确定所有变量的类型

![JavaScript_vs_C++]

### TypeScript的特点

- 类型检查：编译时严格的静态类型检查。
- 语言扩展：比如接口、抽象类等。
- 工具属性：TypeScript可以编译成JavaScript，无需任何额外开销。



### 创建TypeScript程序

1.创建一个文件夹并使用vs code打开，然后执行`npm init -y`初始化工程，`-y`的意思是所有的提问默认都选yes，最后会生成一个package.json。

2.执行`npm i typescript -g`，全局安装TypeScript。执行这个命令的时候可能会出现报错，详情见此链接。

3.安装完成，使用`tsc --init`命令生成`tsconfig.json`配置文件。

4.新建一个文件`src/index.ts`，在其中定义一个字符串:

```typescript
let hello:string = "hello TypeScript";
```

5.运行`tsc ./src/index.ts`，这时一个`index.js`已经被编译好了:

```javascript
var hello = "hello TypeScript";
```





