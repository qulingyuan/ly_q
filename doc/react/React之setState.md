## 类组件中的 setState

```react
setState(updater,[callback]);
```

`setState`可以接受两个参数，第一个参数可以是**对象**或**函数**，第二个可选参数是函数。

第一个参数为对象时，会在同一周期内会将多个 `setState` 进行**批处理**。

```react
//假设 this.state.count 初始值为 0
handleClick() {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
  	console.log(this.setState.count); //0
  }
```

在一个点击事件方法中调用两次`setState`，这种写法每次点击只会自增1，因为 `setState` 会**按执行的顺序进行浅合并**，上述代码会被解析为如下形式：

```javascript
//后面的数据会覆盖前面的更改，所以最终只加了一次。
Object.assign(
    previousState,
    {val: state.val + 1},
    {val: state.val + 1});
```

想要避免 `setState` 的多次调用被合并，应该给`setState`传入一个函数，该函数返回新的 `state`：

```react
//prevState是上一次的state，props是此次更新被应用时的props
//假设 this.state.count 初始值为 0
  handleClick() {
    this.setState((prevState, props) => {
      return { count: prevState.count + 1 };
    });
    this.setState((prevState, props) => {
      return { count: prevState.count + 1 };
    });
    console.log(this.setState.count); //0
  }
```

此时，每次点击就能够正确地自增2了。

但是我们会发现，上面两个例子中，`handleClick` 方法中 `count` 的输出均为 0。这是因为`setState`是异步的，因此在`setState`语句后调用的 `state` 仍为更新前的 `state`，若想得到最新的`state`，可以使用`setState`的第二个参数。

> `setState`的第二个参数是一个可选的回调函数，该回调函数将在**组件重新渲染之后执行**，**等价于在`componentDidUpdate`生命周期内执行**，在这个回调函数中，我们可以拿到更新后的state的值。

上面的例子想要获取最新的 `state`：

````javascript
handleClick() {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
  	console.log(this.setState.count); //0
  }
````

总结：setState传入对象时，setState的多次执行可能会被浅合并。通过传入函数可以避免浅合并的问题。但是无论用哪种写法都不能在setState语句后直接获得最新的state，可以通过setState的第二个参数——回调函数中取得最新的state。

## setState异步



