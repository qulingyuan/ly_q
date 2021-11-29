#### 对盒模型的理解

盒子模型有两种，一种是标准盒模型(content-box)，另一种是IE盒模型(border-box)。二者都是由四部分组成，由内到外分别是 content、padding、border、margin。区别是标准盒模型的width和 height 只包括了 content，而IE盒模型的 width 和 height 包括了 content、padding 和 content。可通过 box-sizing 属性切换。

#### position 定位

position 属性用于指定元素在文档中的定位方式。

**static**：默认值。根据正常文档流定位布局，此时 `top、right、bottom、left` 和 `z-index` 属性无效。

**relative**：相对定位。不改变页面布局，保留元素的原始位置空间，并相对原始位置调整元素位置。relative 对table-*-group、table-row、table-column、table-cell、table-caption 元素无效。

**absolute**：绝对定位。元素被移出正常文档流，不保留元素原始位置空间，相对于最近的**非 static 定位祖先元素的 padding box**来确定元素位置。可设置 `margin` 且不会与其他边距合并。

**fixed**：绝对定位。元素被移出正常文档流。不保留元素原始位置空间，相对于屏幕视口(viewport)的位置来确定元素位置，元素的位置在屏幕滚动时不会改变。fixed 属性会创建新的层叠上下文。当祖先元素的 `transform、perspective` 或 `filter` 属性非 `none` 时，容器由视口改为该祖先。

**sticky**：粘性定位。根据正常文档流进行定位。相对最近的**滚动祖先**(overflow 是 hidden、scroll、auto 或 overlay)、最近的块祖先、table-related 元素确定元素位置。sticky 会创建一个新的层叠上下文。

#### CSS画三角形

CSS画三角形是利用了元素边框连接处等分的原理。

```css
.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 100px;
  border-color: red transparent transparent transparent;
}
```



伪类vs伪元素

CSS画三角形

margin纵向折叠

margin负值

对BFC的理解

position的absolute和relative定位

元素居中

float 的理解

flex 布局的常用属性。

