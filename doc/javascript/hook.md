#### Hook规则

Hook 本质就是 JavaScript 函数，遵循两个规则：

1. **不要在循环，条件或嵌套函数中调用 Hook**，只在React函数的最顶层以及return之前调用Hook。
2. 不要在普通的JavaScript函数中调用Hook，可以在React的**函数组件**以及**自定义的Hook**中调用Hook

