### script 标签的 defer 和 async 区别

已知：浏览器会按照顺序加载和解析 HTML 文件的内容。

- 没有 `defer` 或 `async` 属性，浏览器会立即加载并执行 `js` 脚本，会阻塞 `html` 的解析，第一个脚本解析完毕后才能开始解析下一个脚本，脚本加载完成后再解析后续的HTML文档。
- `async` 脚本加载过程并不阻塞 `html` 的解析，加载完成后**立即执行**该脚本，此时会阻塞 `html` 的解析。多个脚本的执行顺序无法保证。`async` 脚本不应该在加载器件修改 DOM。 
- `defer` 立即下载，延迟执行。加载过程同样不阻塞 `html` 的解析，全部脚本加载完成后，会等待 `html` 解析完成后再执行该脚本，`defer` 脚本在 `DOMContentLoaded` 事件之前执行。`defer` 保证脚本的执行顺序。

### 行内元素 vs 块级元素

HTML4 元素分两大类，行内元素和块级元素

块级元素( `block` )：

- 总是在新行上开始
- 高度，行高以及外边距和内边距都可控制
- 若宽度缺省，则宽度是它的容器的100%
- 可以容纳内联元素和其他块元素

行内元素( 内联元素 `inline` )：

- 和其他元素都在一行上
- 设置height、width 均无效，高度可通过 line-height 来设置，宽度即为其文字或图片的宽度
- margin左右有效，上下无效；padding左右有效，上下无效，注意元素范围是增大了，但是对元素周围的内容是没影响的
- 内联元素只能容纳文本或者其他内联元素

常见块级元素：`p div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 `

常见行内元素：`span img button input select textarea a b strong sub sup label `