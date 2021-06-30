### DOM事件流

事件流的模型是自上而下捕获，到达目标，然后再自下而上冒泡。

1. 事件捕获
2. 到达目标
3. 事件冒泡

对于DOM0级的`btn.onclick()`和DOM2级`btn.addEventListener("click",fn,false)`都是默认事件冒泡。

其中DOM2级第三个默认为false的参数改为true就改为事件捕获。





