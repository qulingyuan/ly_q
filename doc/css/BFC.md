### 常见定位方案

有三种常见的定位方案：

- 普通流（normal flow）

  > 在普通流中，元素按照其在 HTML 中的先后位置自上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。

- 浮动（float）

  > 在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。

- 绝对定位（absolute positioning）

  > 在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

### BFC是什么

BFC即Block Formatting Contents（顶级格式化上下文），它属于上述定位方案的**普通流**。

**具有BFC特性的元素可以看做是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。**

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

### BFC的条件

只要元素满足下面任一条件即可触发 BFC ：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

### BFC的特性及应用

1. #### 同一个BFC下外边距折叠

   margin塌陷问题：在标准文档流中，块级标签之间竖直方向的margin会以大的为准，这就是margin的塌陷现象。可以用`overflow:hidden`产生BFC来解决。
   
   [代码地址](https://codepen.io/qulingyuan/pen/BaRagKJ)
   
   ```html
   <head>
   .div1 {
   		width: 100px;
       height: 100px;
       background: lightgreen;
       margin: 100px;
   }
   .div2 {
     	width: 100px;
       height: 100px;
       background: lightgreen;
       margin: 200px 100px;
     }
   </head>
   <body>
       <div class="div1"></div>
       <div class="div2"></div>
   </body>
   ```
   
   效果：
   
   
   
   结果分析：
   
   因为两个div都处于同一个BFC容器下（body元素），所以第一个div的下边距和第二个div的上边距发生了重叠，所以两个盒子之间距离只有200px，而不是300px。
   
   **如果想要避免外边距的重叠，可以将其放在不同的BFC容器中。**
   
   [代码地址](https://codepen.io/qulingyuan/pen/VwbwJRM)
   
   ```html
   <head>
   .div1 {
   		width: 100px;
       height: 100px;
       background: lightgreen;
       margin: 100px;
   }
   .div2 {
     	width: 100px;
       height: 100px;
       background: lightgreen;
       margin: 200px 100px;
     }
   .container {
     	overflow:hidden
   }
   </head>
   <body>
     <div class="container">
         <div class="div1" />
     </div>
     <div class="container">
         <div class="div2" />
     </div>
   <body>
   ```
   
   这时，两个div的边距就变成了我们期望的300px。
   
   

2. #### BFC可以包含浮动的元素（清除浮动）

高度塌陷问题，在通常情况下父元素的高度会被子元素撑开，而浮动的元素会脱离普通文档流，在这里因为其子元素为浮动元素所以父元素发生了高度坍塌，上下边界重合，这时就可以用BFC来清除浮动了。

```html
<div style="border: 1px solid #000;">
    <div style="width: 100px;height: 100px;background: lightgreen;float: left;"></div>
</div>
```

![BFC_3]()

由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果使触发容器的 BFC，那么容器将会包裹着浮动元素。

```html
<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: lightgreen;float: left;"></div>
</div>
```

![BFC_4]

3. #### 阻止元素被浮动元素覆盖

由于左侧块级元素发生了浮动，所以和右侧未发生浮动的块级元素不在同一层内，所以会发生div遮挡问题。

```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```

![BFC_5]

这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入`overflow:hidden`，就会变成：

```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee;overflow:hidden">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```

![BFC_6]

这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)。
