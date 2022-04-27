# react native动画总结

react native 一共提供了两种动画，一种是可以绘制自定义动画的 `Animated` ；另一种是负责布局动画的`LayoutAnimation`。Animated 旨在以声明的形式来定义动画，今天主要介绍 `Animated`。

官网给出的创建动画的步骤：

> The core workflow for creating an animation is to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and then drive updates via animations using `Animated.timing()`.

将上面的长句翻译并拆开后，我们知道，创建一个`Animated`动画分三步：

1. 创建一个 `Animated.Value`。
2. 将创建的 `Animated.Value`连接到**动画组件**的一个或多个属性。
3. 使用 `Animated.timing` 等方法更改 `Animated.Value`。

## Animated的两种值

`Animated` 提供了两种类型的值：

1. `Animated.Value()` 用于单个值。

可以使用 `Animated.Value().interpolate()` 方法来做值的映射，从而让 `Animated.Value()`  用于多个值。

2. `Animated.ValueXY()` 用于矢量值。

切记，**不要直接修改动画值**，要使用 `Animated` 提供的方法来修改动画值。根据这个特性，所以在**函数式组件中使用 `useRef`，在类组件中使用 `state`来保存动画值**。

```react
const ref = useRef(new Animated.Value(initialValue));
```

## 动画组件

有两种动画组件，一种是 Animated 默认提供的 6 种组件；另一种是封装自定义动画组件的方法。

`Animated`中默认导出了以下动画组件：

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`
- `Animated.FlatList`
- `Animated.SectionList`

也可以用`Animated.createAnimatedComponent()`来封装自定义组件，上面的六个组件也都是用这个方法封装得来的。

## 动画类型

`Animated` 提供了三种动画类型：

- [`Animated.decay()`](https://reactnative.cn/docs/animated#decay)以指定的初始速度开始变化，然后变化速度越来越慢直至停下。
- [`Animated.spring()`](https://reactnative.cn/docs/animated#spring)提供了一个基础的弹簧物理模型.
- [`Animated.timing()`](https://reactnative.cn/docs/animated#timing)使用[easing 函数](https://reactnative.cn/docs/easing)让数值随时间动起来。

其中最常用的是 `timing()`

```react
static timing(value, config);
```

config 有以下参数：

- duration
- easing
- delay
- isInteraction
- useNativeDriver

### useNativeDriver

Animated 的 API 是可序列化的（可转化为字符串以便通信和存储）。开启`useNativeDriver`可以在动画开始前就把所有的配置信息都发送到原生端，然后利用原生代码在 UI 线程上执行动画，而不用每一帧都在两端间来回沟通。这样动画完全脱离了 JS 线程，即便 JS 线程被卡住，也不会影响到动画了。

`useNativeDriver` 只能应用于**非布局属性**，如`transform`,`opacity`。

#### 使用技巧

1. 元素颜色变化：可利用 `opacity` 来分别遮盖两种颜色，以达到变化的效果。

2. 宽度/高度：可利用 absolute + transform + overflow:hidden 达到宽度/高度变化的效果。

## 动画绘制技巧

1. 获取元素的高度/宽度，可以先渲染并隐藏元素，利用 `onLayout` 等属性获取，但要注意使用正确的隐藏方式

   **隐藏元素**：

   1. `display:none`，元素直接从文档流中移除。
   2. `visibility:hidden`，元素在页面中仍占据空间，但不会响应监听事件。

   3. `opacity:0`，只是视觉上不可见了，实际仍占据空间，且响应点击事件。
   4. `position:absolute`，绝对定位将元素移出屏幕范围。不占据空间，不响应点击事件。
   5. `z-index`，设置为最底层。
   6. `clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px)` ，元素裁剪，实际仍占据空间，但是不会响应点击事件。
   7. `transform:scale(0,0)`， 将元素缩放为0。元素仍占据空间，但不会响应点击事件。

2. 

Gdc

