### < script > 阻塞渲染

`<head>`中`<script>`元素会阻塞页面的渲染过程。JavaScript脚本放在 `<head>`里，意味着必须把所有JavaScript 代码都下载、解析和解释完成后，才能开始渲染页面。

解决方案：

将 `<script>`放在`<body>`的最后面。

使用`defer/async/preload`等属性来标记`<script>`标签，来控制其加载顺序。

`async`属性会让这些脚本并行进行请求获取资源，同时当资源获取完成后尽快解析和执行，这个过程是异步的，不会阻塞 HTML 的解析和渲染。

CSS放在`<head>`里，可以避免浏览器渲染的重复计算。

### HTML vs DOM

文档对象模型（DOM）是 HTML 和 XML 文档的编程接口。

DOM 是用来操作和描述 HTML 文档的接口。如果说浏览器用 HTML 来描述网页的结构并渲染，那么使用 DOM 则可以获取网页的结构并进行操作。

### addEventListener

addEventListener(type, listener, options)方法的第三个参数可以是一个option对象，其中有如下属性：

`capture`：boolean，默认false，表示在事件捕获阶段触发。

`once`：boolean，默认false，表示 `listener` 在添加之后最多只调用一次，调用后自动移除。

`passive`：boolean，默认false，表示 `listener` 永远不会调用 `preventDefault()`。

### stopPropagation()

`event.stopPropagation()`阻止事件冒泡。

### preventDefault()

`event.preventDefault()` 阻止默认事件的执行。

