React 整体源码的工作流程：

1. schedule(调度)-scheduler-

   产生的更新会有不同的优先级，schedule 会将这些更新按照优先级排序。

2. render(协调)-reconciler

   本次更新要改变哪些视图。

3. commit(渲染)-renderer

   把需要改变的视图具体的做改变的操作。

scheduler 和 reconciler 是平台无关的，renderer 是平台相关的，所以在 reconciler 中是不能操作 DOM 的，操作的是一个 fiber 节点。在不同的宿主环境，renderer 的包是不同的，浏览器中是ReactDOM、native 中是ReactNative、渲染到 svg/cavans则是ReactArt。