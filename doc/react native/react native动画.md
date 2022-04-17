# react native动画总结

react native 一共提供了两种动画，一种是可以绘制自定义动画的 `Animated` ；另一种是负责布局动画的`LayoutAnimation`。

官网给出的创建动画的步骤：

> The core workflow for creating an animation is to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and then drive updates via animations using `Animated.timing()`.

将上面的长句翻译并拆开后，我们知道，创建一个 rn 动画分三步：

1. 创建一个 `Animated.Value`。
2. 将创建的 `Animated.Value`连接到**动画组件**的一个或多个属性。
3. 使用 `Animated.timing` 等方法更改 `Animated.Value`。

问1：什么是 `Animated.Value`？怎么创建 `Animated.Value`？用什么来保存 `Animated.Value`？

```javascript
new Animated.Value(initialValue);
```

**不要直接修改动画值**！所以在函数式组件中使用 `useRef`，在类组件中使用 `state`。

`Animated` 提供了两种类型的值：

`Animated.Value()` 用于单个值。

`Animated.ValueXY()` 用于矢量值。

`Animated.Value()`可以绑定到属性，也可以插值。（插值是什么）



## 动画组件

`Animated`中默认导出了以下动画组件：

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`
- `Animated.FlatList`
- `Animated.SectionList`

也可以用`Animated.createAnimatedComponent()`来封装自定义组件。

## 动画类型

- [`Animated.decay()`](https://reactnative.cn/docs/animated#decay)以指定的初始速度开始变化，然后变化速度越来越慢直至停下。
- [`Animated.spring()`](https://reactnative.cn/docs/animated#spring)提供了一个基础的弹簧物理模型.
- [`Animated.timing()`](https://reactnative.cn/docs/animated#timing)使用[easing 函数](https://reactnative.cn/docs/easing)让数值随时间动起来。