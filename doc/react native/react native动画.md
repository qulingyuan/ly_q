## 前言

react native 一共提供了两种动画，一种是可以绘制自定义动画的 `Animated` 库；另一种是负责布局动画的`LayoutAnimation`。Animated 旨在以声明的形式来定义动画，今天主要介绍 `Animated`。

## 创建动画

官网给出的创建动画的步骤：

> The core workflow for creating an animation is to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and then drive updates via animations using `Animated.timing()`.

将上面的长句翻译并拆开后，我们知道，创建一个`Animated`动画分三步：

1. 创建一个 `Animated.Value`。
2. 将创建的 `Animated.Value`连接到**动画组件**的一个或多个属性。
3. 使用 `Animated.timing` 等方法更改 `Animated.Value`。

接下来我们看看这三句话里的一些名词都是什么。

## Animated.Value

`Animated` 提供了两种类型的值：

1. `Animated.Value()` 用于单个值。

小技巧：可以使用 `Animated.Value().interpolate()` 方法来做值的映射，从而让 `Animated.Value()`  对应多个值。

2. `Animated.ValueXY()` 用于矢量值。

使用 `Animated.Value`最终要的一点是：**不要直接修改动画值！**，要使用 `Animated` 提供的方法来修改动画值，如`setValue()`方法等。这也就意味着，在函数组件中使用`state`来保存动画值的话，`setState` 是永远都不会被用到的。所以建议在**函数式组件中使用 `useRef`保存动画值，在类组件中使用 `state`来保存动画值**。

```react
const opacity = useRef(new Animated.Value(initialValue)).current;
```

## 动画组件

常规的组件必须经过处理才能用于动画，所谓的特殊处理主要是指把动画值绑定在属性上，并且在一帧帧执行动画时避免 react 重新渲染和重新调和的开销。此外还得在组件卸载时做一些清理工作，使得这些组件在使用时是安全的。

Animated 提供了处理组件的方法：`Animated.createAnimatedComponent()`，该方法接受一个字符串——组件的名称，并返回一个动画组件：

```react
const AnimatedButton = Animated.createAnimatedComponent('MyButton');
```

此时就可以使用 `AnimatedButton` 来进行动画属性的绑定操作了。

另外，对于一些常用的组件，`Animated` 默认提供它们对应的动画组件：

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`
- `Animated.FlatList`
- `Animated.SectionList`

当然，这些默认提供的组件也都是用`createAnimatedComponent`这个方法封装得来的。

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

- `duration`: 动画的持续时间（毫秒），默认值为 500。
- `easing`: 缓动函数。 默认为`Easing.inOut(Easing.ease)`。
- `delay`: 开始动画前的延迟时间（毫秒），默认为 0。
- `isInteraction`: 指定本动画是否在`InteractionManager`的队列中注册，而`Interactionmanager` 可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行，这样可以保证 JavaScript 动画的流畅运行，默认值为 true。
- `useNativeDriver`: 启用原生动画驱动。默认不启用(false)。

## 简单动手

光说不练假把式，我们先来写一个简单的动画：



### useNativeDriver

`Animated` 的 API 是可序列化的（可转化为字符串以便通信和存储）。开启`useNativeDriver`可以在动画开始前就把所有的配置信息都发送到原生端，然后利用原生代码在 UI 线程上执行动画，而不用每一帧都在两端间来回沟通。这样动画完全脱离了 JS 线程，即便 JS 线程被卡住，也不会影响到动画了。

但要注意，`useNativeDriver` 只能应用于**非布局属性**，如`transform`,`opacity`，如果应用到了布局属性上，比如`height`，就会报出如下错误：



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

