### Babel的用途

转译esnext、typescript、flow等目标环境支持的 js

代码静态分析工具

### Babel的编译流程

- parse：通过 parser 把源码转成抽象语法树(AST)，整个过程经历了词法分析和语法分析。
- transform：遍历 AST，调用各种 transform 插件对 AST 进行增删改。调用对应的visitor函数。返回新的AST。
- generate：把转换后的 AST 打印成目标代码，并生成 sourcemap。

[AST 节点类型文档](https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md)

[@babel/types的 ts 类型定义](https://github.com/babel/babel/blob/main/packages/babel-types/src/ast-types/generated/index.ts)

[babel工具书](https://github.com/jamiebuilds/babel-handbook)