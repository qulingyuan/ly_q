## 类组件 vs 函数组件

类组件和函数组件是基于不同的心智模型来设计的。

类组件是面向对象编程思想的一种表征。其关注点是生命周期，但有以下几个缺点：

- 业务逻辑和生命周期耦合在一起，内部逻辑难以实现拆分和复用。
- 类组件内部预设了太多“现成的东西”，会比较“重”。
- `this` 绑定书写麻烦，虽然 `props` 不可变，但 `this` 是可变的。

函数组件是函数式编程思想的一种表征。其关注点在于业务逻辑的拆分。

函数组件更符合 react 根据数据更新视图的设计理念。

`props` 会在函数组件执行的一瞬间就被捕获，所以不会变化。

**对于类组件来说，底层只需要实例化一次，实例中保存了组件的 state 等状态。对于每一次更新只需要调用 render 方法以及对应的生命周期就可以了。但是在函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明。**

## 类组件State

```react
setState(updater,[callback]);
```

`setState`可以接受两个参数，第一个参数可以是**对象**或**函数**，第二个可选参数是函数。

第一个参数为对象的写法：

```react
this.setState(newState);
```

这种写法会在同一周期内会将多个setState进行**批处理**。

```react
 handleClick () {
    this.setState({
        val: this.state.val + 1
    })
     this.setState({
        val: this.state.val + 1
    })
  }
```

在一个点击事件方法中调用两次`setState`，这种写法每次点击只会自增1，因为setState会**按执行的顺序进行浅合并**，上述代码会被解析为如下形式：

```javascript
//后面的数据会覆盖前面的更改，所以最终只加了一次。
Object.assign(
    previousState,
    {val: state.val + 1},
    {val: state.val + 1});
```

想要基于当前的state更新state，应该给`setState`传入一个函数，该函数返回新的state：

```react
//prevState是上一次的state，props是此次更新被应用时的props
 handleClick () {
    this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
     this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
 }
```

此时，每次点击就能够正确地自增2了。

`setState`是异步的，因此在`setState`语句后调用的state仍为更新前的state，若想得到最新的state，可以使用`setState`的第二个参数。

> `setState`的第二个参数是一个可选的回调函数，该回调函数将在**组件重新渲染之后执行**，**等价于在`componentDidUpdate`生命周期内执行**，在这个回调函数中，我们可以拿到更新后的state的值。

例如：

````javascript
handleChange = () => {
    console.log(this.state.val)              // 1
    this.setState({
        val: val + 1
    }, () => console.log(this.state.val))    // 2
    console.log(this.state.val);         		 // 1
};
````

总结：setState传入对象时，setState的多次执行可能会被浅合并。通过传入函数可以避免浅合并的问题。但是无论用哪种写法都不能在setState语句后直接获得最新的state，可以通过setState的第二个参数——回调函数中取得最新的state。

## 组件之间通信方式

React 组件一共有 5 种通信方式：

1. props 和 callback 函数
2. ref
3. React-redux 或 React-mobx 状态管理库
4. context 上下文
5. event bus 事件总线



## JSX是什么

JSX 是 `React.createElement()` 函数的语法糖，经过 Babel 转译，会变成如下结构：

```react
<Component {...props}>{hildren}</Component>
//上面的 JSX 会转换成下面的结构
React.createElement(
  component,
  [props],
  [...children]
)
```

JSX 允许在`{}`中书写 **JavaScript 表达式**，由于 `if` 和 `for` 不是 JavaScript，故不能在 JSX 中直接使用。

`false`、`true`、`null`、`undefined`不会被渲染，但转换为布尔值后为 false 的值仍然会被渲染，如 `0` 和空字符串`''`。这些变量使用时要强转布尔值。

## 虚拟 DOM

## 列表为什么要有key

## setState 同步or异步

## Fiber 架构

## 组件通信方式

## 元素vs 组件

React 元素是不可变对象，表示某个时刻特定的 UI。更新UI 的方式是创建一个新的元素，传入 ReactDOM.render()

key 可以是字符串或数字。

您只能在组件（或其他 Hook）*的顶层调用 Hook。*如果您想进入`useState`条件或循环，请提取一个新组件并将其放在那里。

## 事件

阻止默认行为：

e.preventDefault();