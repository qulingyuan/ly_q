## setState使用

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

## setState异步的原理



