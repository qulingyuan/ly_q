### 盒模型

盒模型由四个部分组成：

- 外边框边界 `margin`
- 边框边界 `border`

- 内边距边界 `padding`

- 内容边界 `content`

盒模型有两种类型：

- IE盒模型(`border-box`)：`width = content + padding + border`。
- 标准盒模型(`content-box`)：`width = content`。

使用`box-sizing`来指定`border-box`或`content-box`。

### 内联元素vs块状元素

浏览器中，元素有两种：

- 内联元素(`display:inline` )：又称行内元素。与其他内联元素位于同一行，且宽高设置无效，默认的宽度就是文字的宽度。垂直方向的内外边距设置无效，不可容纳块级元素。如：`img、span、a、button、input`。

- 块级元素(`display:block`)：独占一行，未设置宽度时，宽度为父容器的100%。宽高、内外边距设置有效。如：`div、p、h1、ul`。
- 内联块级元素(`display:inline-block`)：宽高、内外边距设置有效，可位于块级元素或内联元素内，可容纳块级元素。

### 文档流和元素定位

正常的文档流在 HTML 里面为从上到下，从左到右的排版布局。
`position`可以调整元素定位。

`static`：默认值，元素忽略 `top/bottom/left/right` 或者 `z-index` 声明。

`relative`：相对定位，元素保持原有文档流，但相对本身的原始位置发生位移，且会占有原始位置的空间。后一个元素默认排列到其原始位置的后面。`relative`元素可以溢出父元素，使用`overflow:hidden`可以隐藏溢出部分。

`absolute`：绝对定位，元素脱离文档流，不占有原始空间，相对非 `static` 父元素绝对定位，后一个元素默认排列到前一个元素后面。

`fixed`：与`absolute`定位相同，但相对浏览器窗口进行绝对定位。

### 元素堆叠 z-index

- z-index 只在定位元素(定义了`position`属性，且属性值为非`static`的元素)上有效果。
- 堆叠顺序由**层叠上下文**、**层叠等级**共同决定，层叠上下文可简单理解为父元素的层叠顺序。父元素`z-index`大的元素一定显示在前面，父元素`z-index`相同时，才会按照元素本身的`z-index`比较。
- 同级元素，不设置`z-index`或`z-index`相等时，后面的元素会叠在前面的元素上方；`z-index`不同时，`z-index`大的元素会显示在前面。

### Flex 布局

Flex布局包括Flex容器和Flex元素：

- Flex容器：具有`display:flex`属性的元素。
- Flex元素：父元素具有`display:flex`属性的元素。

Flex容器属性：

- `flex-direction`：指定主轴方向，即项目排列的方向，默认从左向右。
- `flex-wrap`：多行Flex容器如何换行。
- `flex-flow`：`flex-direction`属性和`flex-wrap`属性的简写形式。
- `justify-content`：元素在主轴上的对齐方式。
- `align-item`：元素在交叉轴上的对齐方式。
- `align-content`：多根轴线的对其方式。

Flex元素属性：

- `order`：项目的排列顺序。数值越小，排列越靠前，默认为0。
- `flex-grow`：项目的放大比例，默认为0。
- `flex-shrink`：项目的缩小比例，默认为1。
- `flex-basis`：在分配多余空间之前，项目占据的主轴空间（main size），默认为auto。
- `flex`：`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。
- `align-self`：允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性，默认为auto。

### 居中对齐

#### 水平居中

- 内联元素：`text-align:center`

- 块级元素：指定宽度 + `margin:0 auto`

- absolute元素：

  - `left:50%` + `margin-left:元素宽度一半的负值`。
  - `left:50%` + `transform:translateX(-50%)`。
  - left、right均设为0 + `margin:0 auto`。

- flex元素：

  `display: flex` + `justify-content:center`。

#### 垂直居中

- 内联元素：单行文本，子元素的line-height等于父元素的height。

- absolute 元素：
  - `top:50%` + `margin-top:元素高度一半的负值`。
  - `top:50%` + `transform:translateY(-50%)`。
  
- flex元素：

  `display: flex` + `align-item:center`。

#### 水平垂直居中

`absolute` + `top:50%` + `left:50%` + `margin-top:元素高度负值的一半` + `margin-left:元素宽度负值的一半`。

`absolute` + `top:50%` + `left:50%` + `translate:transform(-50%,-50%)`。

`absolute` + `top,left,bottom,right均设为0` + `margin:auto`。

`display: flex` + `align-item:center` + `justify-content:center`。

