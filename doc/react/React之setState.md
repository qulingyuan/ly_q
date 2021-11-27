## 类组件中的setState

### setState使用

```react
setState(updater,[callback]);
```

`setState`可以接受两个参数，第一个参数可以是**对象**或**函数**，第二个参数是函数。

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

在一个点击事件方法中调用两次`setState`，setState会**按执行的顺序进行浅合并**，上述代码会被解析为如下形式：

```javascript
//后面的数据会覆盖前面的更改，所以最终只加了一次。
Object.assign(
    previousState,
    {val: state.val + 1},
    {val: state.val + 1});
```

想要基于当前的state更新state，应该给`setState`传入一个函数：

```react
//prevState是上一次的state，props是此次更新被应用时的props
this.setState((prevState,props)=>{
  	return newState;
})
```



