React元素事件与DOM元素事件的语法差异：

- React的事件采用驼峰式命名，而不是纯小写的方式。
- 使用JSX语法时，需要传入一个函数作为事件处理函数，而非字符串。
- 使用函数时不能加括号，否则会直接执行。
- React中不能使用`return false`阻止事件的默认行为，必须显示调用事件对象的`preventDefault`方法来阻止事件的默认行为。
- 尽量在`constructor`中对函数进行`this`绑定，或使用`class field`语法，在回调中使用箭头函数虽然也可以，但是这种方法会在每次渲染时都会重新创建一个新的事件处理函数，会带来额外的性能问题。该回调函数作为 `prop` 传入子组件时，这些组件可能会进行额外的重新渲染。

### React合成事件

React17之前，所有的时间都绑定在document上，React17开始，所有事件都绑定在整个APP的根节点上，这样更利于一个 `HTML` 下存在多个应用(微前端)。

#### React为什么要合成事件？

1. 虚拟DOM render的时候，DOM很可能还没有真实地render到页面上，所以无法绑定事件。
2. React 可以屏蔽底层事件的细节，避免浏览器兼容性问题。
3. 性能问题。

React可以通过事件的 `srcElement` 属性，知道他是从哪个节点开始发出的。

- 冒泡阶段：开发者正常给 React 绑定的事件比如 onClick，onChange，默认会在模拟冒泡阶段执行。
- 捕获阶段：如果想要在捕获阶段执行可以将事件后面加上 Capture 后缀，比如 onClickCapture，onChangeCapture。

阻止捕获或冒泡用`e.stopPropagation()`。

阻止默认行为用`e.preventDefault()`。

- 绑定事件并不是一次性绑定所有事件，比如发现了 onClick 事件，就会绑定 click 事件，比如发现 onChange 事件，会绑定 `[blur，change ，focus ，keydown，keyup]` 多个事件。

- React 事件合成的概念：React 应用中，元素绑定的事件并不是原生事件，而是React 合成的事件，比如 onClick 是由 click 合成，onChange 是由 blur ，change ，focus 等多个事件合成。
