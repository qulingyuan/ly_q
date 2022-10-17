## 盒模型

盒模型由四个部分组成：

- 外边距 `margin`
- 边框 `border`

- 内边距 `padding`

- 内容 `content`

盒模型有两种类型：

- IE盒模型(`border-box`)：`width = content + padding + border`，高度同理。
- 标准盒模型(`content-box`)：设置 `width` 和 `height`，实际设置的是`content`。

`box-sizing`设为`border-box`或`content-box`分别指定IE 盒模型和标准盒模型。

## 内联元素vs块状元素

浏览器中，元素主要分为块级元素和内联元素，通过设置`display`属性为`block`和`inline`控制盒子的类型。

- 内联元素(`display:inline` )：又称行内元素，如`img、span、a、button、input`。
  1. 与其他内联元素位于同一行，不会产生换行。
  2. `width`、`height` 属性设置无效，宽度由内容的宽度决定。
  3. 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 `inline` 状态的盒子推开。水平方向正常 。
  4. 不可容纳块级元素。
- 块级元素(`display:block`)：如`div、p、h1、ul`。
  1. 独占一行，未设置宽度时，宽度为父容器的100%。
  2. 宽高、内外边距边框设置有效。
  3. 
- 内联块级元素(`display:inline-block`)：宽高、内外边距设置有效，可位于块级元素或内联元素内，可容纳块级元素。

## 文档流和元素定位

正常的文档流在 HTML 里面为从上到下，从左到右的排版布局。
`position`可以调整元素定位。

- `static`：默认值，元素忽略 `top/bottom/left/right` 或者 `z-index` 声明。
- `relative`：相对定位，元素保持原有文档流，但相对本身的原始位置发生位移，且会占有原始位置的空间。后一个元素默认排列到其原始位置的后面。`relative`元素可以溢出父元素，使用`overflow:hidden`可以隐藏溢出部分。
- `absolute`：绝对定位，元素脱离文档流，不占有原始空间，相对非 `static` 父元素绝对定位，后一个元素默认排列到前一个元素后面。

- `fixed`：绝对定位，与`absolute`定位相同，但相对浏览器窗口进行绝对定位。

## 元素堆叠 z-index

- z-index 只在**定位元素**(定义了`position`属性，且属性值为非`static`的元素)上有效果。
- 堆叠顺序由**层叠上下文**、**层叠等级**共同决定，层叠上下文可简单理解为父元素的层叠顺序。父元素`z-index`大的元素一定显示在前面，父元素`z-index`相同时，才会按照元素本身的`z-index`比较。
- 同级元素，不设置`z-index`或`z-index`相等时，后面的元素会叠在前面的元素上方；`z-index`不同时，`z-index`大的元素会显示在前面。

## Flex 布局

Flex 布局包括 Flex 容器和 Flex 元素：

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

## 居中对齐

### 水平居中

- 内联元素：`text-align:center`

- 块级元素：指定宽度 + `margin:0 auto`

- absolute元素：

  - `left:50%` + `margin-left:元素宽度一半的负值`。
  - `left:50%` + `transform:translateX(-50%)`。
  - left、right均设为0 + `margin:0 auto`。

- flex元素：

  `display: flex` + `justify-content:center`。

### 垂直居中

- 内联元素：单行文本，子元素的line-height等于父元素的height。

- absolute 元素：
  - `top:50%` + `margin-top:元素高度一半的负值`。
  - `top:50%` + `transform:translateY(-50%)`。
  
- flex元素：

  `display: flex` + `align-item:center`。

### 水平垂直居中

- `absolute` + `top:50%` + `left:50%` + `margin-top:元素高度负值的一半` + `margin-left:元素宽度负值的一半`。

- `absolute` + `top:50%` + `left:50%` + `translate:transform(-50%,-50%)`。

- `absolute` + `top,left,bottom,right均设为0` + `margin:auto`。

- `display: flex` + `align-item:center` + `justify-content:center`。

## margin重叠

概念：在CSS中，两个或多个**毗邻**的**普通流**中的**块级元素**（可能是父子元素，也可能是兄弟元素）在**垂直**方向上的外边距会发生叠加，其大小为单个边距的**最大值**。

### 必备条件

必须处于常规文档流（非 float 和 absolute 定位）的块级元素，并且处于同一个 BFC 中。

二者毗邻，即没有 `border` 和 `padding` 将其分开。

### 三种情况

- 同一层相邻元素之间

上面元素的 `margin-bottom` 和下面元素的 `margin-top` 重叠。

- 父元素与其第一个或最后一个子元素之间。

父元素的 `margin-top` 与其第一个常规文档流的子元素的 `margin-top`重叠。

`height` 为 `auto` 的父元素的 `margin-bottom` 与其最后一个常规文档流的子元素的`margin-bottom`重叠。

- 空的块级元素

当一个块元素上边界`margin-top` 直接贴到元素下边界`margin-bottom` 时也会发生 `margin` 重叠。

### 解决方案

破坏任何一个必要条件即可防止 `margin` 重叠：

- 使用 `float` 布局
- `position` 为 `absolute`
- `display` 设置为除 `block` 外的值
- 设置元素的 `border` 或 `padding` 等属性。
- overflow 等触发 `BFC`

[参考链接](https://tech.youzan.com/css-margin-collapse/)

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)

## margin负值问题

- `margin-top` 和 `margin-left` 负值，元素向上、向左移动
- `margin-right` 负值，右侧元素左移，自身不受影响
- `margin-bottom` 负值，下方元素上移，自身不受影响

## 伪类和伪元素

**伪类**用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过 `:hover` 来描述这个元素的状态。可以在一个选择器中同时写多个伪类。

**伪元素**用于创建一些不在文档树中的元素，并为其添加样式，或者为元素的某些部分设置样式。比如说，我们可以通过 `::before` 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。一个选择器中只能使用一个伪元素，伪元素必须紧跟在语句中的简单选择器/基础选择器之后。历史原因，大部分浏览器都支持双冒号（`::`）或单冒号（`:`）表示伪元素。

区别：伪类为**文档树**中的既有元素添加样式；伪元素会创建不在文档树中的元素。

[总结伪类与伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)

## CSS 画三角形

原理：相邻边框连接处均分，将元素的宽高设为 0，只设置 `border`，把其余三条边颜色设为 `transparent`。

```css
#triangle {
  width: 0;
  height: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent red transparent;
}
```

## BFC（块级格式上下文）

一块独立渲染区域，其内部元素的布局不受外界的影响，反之亦然。利用这个特性来消除浮动元素对其非浮动的兄弟元素和其子元素带来的影响。

### 形成 BFC 条件

- 浮动元素：即`float` 不是 `none`。
- 绝对定位元素：即 `position` 是 `absolute` 或 `fixed`。
- `overflow` 值不是 `visible` 的块级元素。
- 非块级盒子的块级容器：`display` 是 `inline-block`、`flex`、`inline-flex`、`table-cell`、`table-captions` 等

### BFC 常见应用

- 清除浮动：解决因容器内部包含浮动元素所导致的容器高度塌陷问题。在容器创建 `BFC`，`BFC` 可识别并包含浮动元素。
- 外边距重叠：在同一`BFC` 容器内部的两个相邻盒子会发生 `margin` 重叠。
- 避免外边距重叠：当两个相邻元素属于不同的 `BFC` 时，就不会出现 `margin` 重叠。

## 清除浮动

清除浮动目的是解决**高度塌陷**问题。

`clear` 官方解释：元素盒子的边不能和**前面的**浮动元素相邻。

`clear` 属性指定一个元素是否必须移动(清除浮动后)到在它**之前的**浮动元素下面。该属性适用于浮动和非浮动元素。

另外，凡是能使用 `clear:left`或`clear:right`的地方，都可以用`clear:both`替换。

### 清除浮动方式

- 上述的 `BFC`，不推荐。

- 具有 `clear` 属性的空标签，不太推荐。

  在浮动元素后面添加一个空 `div` 元素并设置`{clear:both}`

- `::after`伪元素，推荐。

  给浮动元素添加带有 `::after` 伪元素的 CSS 样式。

  ```css
   /* 手写 clearfix */
          .clearfix::after {
              content: '';
              display: table; //也可以是block或list-item
              clear: both;
          }
  				.clearfix { *zoom: 1; } //解决 IE 兼容性问题
  ```

  因为 `clear` 属性只在块级元素生效，而`::after`伪元素默认是内联，故需要设置 `display` 属性。

## 浏览器兼容问题

CSS 具有以下特性：

- 浏览器遇到无法解析的CSS代码时会直接跳过该CSS样式，不影响其他CSS的执行；

- 当为一个元素指定多个CSS样式的时候，浏览器会加载样式表中最后的CSS代码进行渲染。

  可以利用上述两个属性解决浏览器兼容问题。例如：

  ```css
  body {
  	width:50%;
  	width:calc(100%-50px);
  }
  ```

  对于支持 `calc` 语法的浏览器，第二行会覆盖第一行；否则，样式为第一行。

## 单行/多行文本溢出省略

### 单行文本

1. 设置宽度

   width

2. 强制文本在一行内显示

   white-space : nowrap;

3. 隐藏溢出内容

   overflow : hidden;

4. 对溢出内容省略

   text-overflow:ellipsis

### 多行文本

下面的方案只适用于知道显示的行数并设置行高才行。

```css
/*单行文本溢出*/
p {
  width:100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*多行文本溢出*/
p {
  position: relative;
  line-height: 1.5em;
  /*高度为需要显示的行数*行高，比如这里我们显示两行，则为3*/
  height: 3em;
  overflow: hidden;
}

p:after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
}
```

## 隐藏元素

1. `display:none`，元素直接从文档流中移除。
2. `visibility:hidden`，元素在页面中仍占据空间，但不会响应监听事件。

3. `opacity:0`，只是视觉上不可见了，实际仍占据空间，且响应点击事件。
4. `position:absolute`，绝对定位将元素移出屏幕范围。不占据空间，不响应点击事件。
5. `z-index`，设置为最底层。
6. `clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px)` ，元素裁剪，实际仍占据空间，但是不会响应点击事件。
7. `transform:scale(0,0)`， 将元素缩放为0。元素仍占据空间，但不会响应点击事件。

