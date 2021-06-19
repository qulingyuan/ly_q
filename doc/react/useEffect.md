useEffect的作用：**在 React 更新 DOM 之后（渲染之后）执行某些操作**。

可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

在class组件中，生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。hook 允许我们按照代码的用途分离他们。

**effect 的清除阶段在每次重新渲染时都会执行，而不是只在卸载组件的时候执行一次。**

React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`，因此会使得额外操作很方便









[useEffect----阮一峰](http://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)

