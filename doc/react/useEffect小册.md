useEffect()中每次传入的函数都是新的。

React 会向 `setTimeout`回调函数一样，放入任务队列，等到主线程任务完成，DOM 更新，js 执行完成，视图绘制完毕，才执行。所以 useEffect 回调函数不会阻塞浏览器绘制视图。

useLayoutEffect 是在 DOM 更新之后，浏览器绘制之前。useLayoutEffect callback 中代码执行会阻塞浏览器绘制。

useEffect代码不会阻塞浏览器绘制。在时机上 ，componentDidMount / componentDidUpdate 和 useLayoutEffect 更类似。

useInsertionEffect 的执行时机要比 useLayoutEffect 提前，useLayoutEffect 执行的时候 DOM 已经更新了，useInsertionEffect 的执行的时候，DOM 还没有更新。

useInsertionEffect 主要是解决 CSS-in-JS 在渲染中注入样式的性能问题