useEffect的作用：**在 React 更新 DOM 之后（渲染之后）执行某些操作**。

可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

在class组件中，生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。hook 允许我们按照代码的用途分离他们。

React 会等待浏览器**完成画面渲染之后才会延迟调用** `useEffect`，因此会使得额外操作很方便

**使用useEffect时，effect 的清除阶段在每次重新渲染时都会执行，而不是只在卸载组件的时候执行一次这一点与class组件不同。**

更新过程：

> 初始 state 渲染  ---->  运行第一个 effect  ---->  state/props **更新**  ---->  清除上一个 effect  ---->  运行下一个 effect ... ...  ---->  **卸载**  ----> 清除最后一个effect

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数，这时 effect 内部的 props 和 state 就会一直拥有其**初始值**。



### 重新认识函数式组件的渲染

每次渲染就相当于调用了一次组件函数。

每一次渲染都有它自己的props和state，props和state是始终保持不变的，且他们在不同的渲染中是相互独立的。与数据类似，每一次渲染都有它自己的事件处理函数，且该函数会捕获该事件发生时的props和state。同样的，每一次渲染都有它自己的effect副作用函数。

下面的代码中，count 仅仅是一个数字，并不是“data binding”，“watcher”，“proxy”，也并不会“监听”状态的变化并自动更新。在每次的渲染中，它都是一个确定的数字。

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

react 只会在浏览器绘制后运行 effects，**effect上一次的 effect 的清除会在重新渲染后运行**。这意味着渲染后的effect内仍然可以访问到老的props。原因是：effect的清除并不会读取“最新”的props，只能读取到定义他的那次渲染中的props的值，而effect的清除中的props是在上一次渲染中的effect中读取的。

使用useEffect的一些技巧：

1. 在useEffect中更新state，最好使用传入函数的形式。这样可以避免在依赖数组中添加state依赖。

2. 如果useEffect中更新state时，需要依赖props或另一个state时，可以使用useReducer来解耦Action的更新。useReducer可以让我们把组件内发生了什么（action）和状态如何响应并更新分开表述。

3. 在useEffect内使用函数时，有几种方式：

   - 把函数定义放在useEffect内部。（不推荐，函数层级太多时我们可能会忘记更新依赖）
   - 如果函数只在effect中调用，把函数定义放在useEffect内部，依赖的state添加到依赖数组。（推荐，因为不用考虑“间接依赖”了）
   - 如果函数多个场景均调用了。有两种方式，一是该函数没有使用组件内的任何值，应该把它提取到组件外面定义，然后可以直接在useEffect中使用，且useEffect不需要添加该函数依赖；二是该函数使用了组件内的值，这时应该把该函数用useCallback包装起来，然后将函数添加到依赖数组中。第二种情况也能解决第一种情况的问题。使用useCallback包装起来使得函数本身只在需要改变的时候才改变，而不是去掉对函数的依赖。

   request race condition解决：

   利用闭包解决

```javascript
function Article({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      const article = await API.fetchArticle(id);
      if (!didCancel) {
        setArticle(article);
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  // ...
}
```



不要再 react 中直接使用匿名函数，最好将其赋值给一个变量后，使用那个变量，可以避免每次渲染都重复创建函数。

Move out the `renderItem` function to the outside of render function, so it won't recreate itself each time render function called.





[DAN的从全新的心智模型去理解useEffect，非常受用](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

[useEffect----阮一峰](http://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)

