JS小知识：

Event.currentTarget 是指向事件绑定的元素；Event.target 是事件触发的元素。

### React中的event

1. event 是 SyntheticEvent，模拟出来 DOM 事件所有能力。
2. event.nativeEvent 是原生事件对象。
3. 所有的事件，都被挂载到 document 上。
4. 和 DOM 事件不一样，和 VUE 事件也不一样。

#### 非受控组件-使用场景

必须手动操作 DOM 元素，setState 实现不了

文件上传`<input type="file">`

某些富文本编辑器，需要传入 DOM 元素。

#### Portals 使用场景

overflow:hidden

父组件 z-index 值太小

fixed 需要放在 body 第一层级

#### shouldComponentUpdate优化

shouldComponentUpdate(nextprops,nextstate)可以判断组件是否更新。

React默认：父组件有更新，子组件则无条件也更新！！



props传入，state更新，forceUpdate()都会引发getDerivedStateFromProps的执行。

在浏览器端，可以认为componentDidMount 一定是在真实 DOM 绘制完成之后调用。

PureComponent 默认实现了shouldComponentUpdate函数，在这个函数中对 props 和 state 进行浅比较，用来判断是否触发更新。

但渲染时的报错，只能通过 componentDidCatch 捕获

#### 类组件vs函数组件

类组件与函数组件本质上代表了两种不同的设计思想。

- 类组件的根基是 OOP（面向对象编程），所以它有继承、有属性、有内部状态的管理。

- 函数组件的根基是 FP，也就是函数式编程。它属于“结构化编程”的一种，与数学函数思想类似。也就是假定输入与输出存在某种特定的映射关系，那么输入一定的情况下，输出必然是确定的。

