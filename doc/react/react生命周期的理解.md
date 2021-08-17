一般来说，讨论生命周期时，说的是类组件，因为函数式组件没有生命周期的概念，它只是一个函数，从头执行到尾。

react的生命周期：

> 挂载---->更新---->卸载

下面细数生命周期各个阶段按顺序被调用的函数

### 挂载阶段

挂载阶段是指组件从初始化到完成加载的过程。

#### constructor(props)

constructor(props)是类通用的构造函数，

只能用于两种情况：

- 通过给this.state赋值对象来初始化state(只有constructor中能使用this.state，其余函数都用setState()方法)
- 为事件处理函数绑定实例



```react
import React from 'react'
class Counter extends React.Component {
  constructor(props) {
    super(props); // 其实就是es6中的继承
    this.state = {
      count: 0,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
     // do some stuff
  }
  render() {
     return null
  }
}
```

也可以不写constructor()，`Create React App`默认启用此语法：

```react
import React from 'react'
class Counter extends React.Component {
  //此语法确保了`handleclick`内的`this`已被绑定
   state = {
      count: 0,
   }
   // 类属性第三阶段提案
   handleClick = () => {
     // do some stuff
   }
  render() {
     return null
  }
```



### static getDerivedStateFromProps(props,state)

本函数的作用是使组件在props变化时更新state。

触发时机：

当props被传入时

state发生变化时

forceUpdate被调用时

