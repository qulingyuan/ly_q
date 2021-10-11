react是基于Flux架构衍生出来的UI框架。

Flux架构的数据流向是单向的，以状态为基础展示UI。

![Flux架构]()

https://6n20nrzlxz.codesandbox.io

JSX 是 `React.createElement(type,config,child)` 的语法糖，通过 Babel 编译完成从前者到后者的转换。

JSX 所有内容在渲染之前都被转换成了字符串，可有效防止 XSS 攻击。

React 元素是不可变对象，一旦创建了，就无法更改其子元素或属性。更新UI的唯一方式是`ReactDOM.render(element, container[, callback])`，render 得到的是虚拟DOM，且只更新需要更新的部分。

props的只读性： React 组件的props不能被修改。

使用State的三个注意：

- 不能直接修改state
- state的更新可能是异步的
- state的更新会被合并

React元素事件与DOM元素事件的语法差异：

- React的事件采用驼峰式命名，而不是纯小写的方式。
- 使用JSX语法时，需要传入一个函数作为事件处理函数，而非字符串。
- 使用函数是不能加括号，否则会直接执行。
- React中不能使用return false阻止事件的默认行为，必须显示调用事件对象的preventDefault方法来阻止事件的默认行为。
- 尽量在constructor中对函数进行this绑定，或使用class field语法，在回调中使用箭头函数虽然也可以，但是这种方法会在每次渲染时都会重新创建一个新的事件处理函数，会带来额外的性能问题。该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。

