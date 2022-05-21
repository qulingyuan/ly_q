「本文已参与低调务实优秀中国好青年前端社群的写作活动」

## 前言

react native 一共提供了两种动画，一种是可以绘制自定义动画的 `Animated` 库；另一种是负责布局动画的`LayoutAnimation`。`Animated` 旨在以声明的形式来定义动画，今天主要介绍 `Animated`。

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

这里的`useNativeDriver`的具体作用和使用技巧将在下一篇讲解。

## 绘制进度条

先来画一个简单的进度条，效果为：进入页面后，进度条变长的同时，颜色也由绿色渐变为红色。

![2022-05-21_09-27-58 (1)](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202205210929311.gif)

再看代码：

```react

const App = () => {
    //使用 ref 来保存 Animated.Value 动画值
    const widthX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        //表示进入页面后三秒钟时间内 widthX 变量从 0 变化到 375，记住最后一定要有start()来启动动画。
        Animated.timing(widthX, {
            toValue: 375,
            duration: 3000,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    height: 20,
                    width: widthX,
                    //这里用到了interpolate方法来进行插值计算，一个动画值对应了两个属性
                    backgroundColor: widthX.interpolate({
                        inputRange: [0, 375],
                        outputRange: ['green', 'red'],
                    }),
                }}
            >
            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
    },
});
```

上面的代码中，我们使用到了一个在写动画时经常会用到的一个方法 `interpolate`，这个方法可以对动画值做一个映射，这样我们可以用一个动画值来绑定多个属性。

## 复杂动画思想

上面的动画比较简单，在实际开发过程中，我们经常会碰到比较复杂的动画效果。这时候不要慌，复杂动画无非就是简单动画的组合，中心思想就是对动画进行“分解”。复杂动画无非就是对平移，渐变，旋转等简单动画的组合封装。
![2022-05-21_09-58-35 (1)](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202205211035304.gif)

比如想要实现上图的红包浮动的效果，可以将动画拆解为中间的卡片变小的同时，两边的卡片变大；中间的卡片变大的同时，两边的卡片变小，但三张卡片的间距始终不变。这样浮动效果就实现出来了。

## 手势动画

上面的介绍的动画都是使用 `timing()`方法，要么在进入页面后，要么在触发了某个事件后，动画开始启动。实际开发中，我们经常还会遇到另外一种动画：跟手势相关的动画。

这里我们举一个头部渐变效果的例子，大部分 App 都有导航栏渐变效果，即随着页面上滑，头部的导航栏缓慢浮现。

![2022-05-21_10-49-20 (1)](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202205211050771.gif)

这里只需要三行核心代码即可实现：

```react
//1. 声明动画值保存页面已滚动的长度
const scrollY = useRef(new Animated.Value(0)).current;
//2. 使用 Animated.event方法将event.nativeEvent.contentOffset.y的值即 Y轴的移动距离映射到了scrollY上。
<ScrollView 
  onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}])}>
</ScrollView>
//3. 将scrollY通过interpolate方法映射到透明度上，当页面滑动距离为 0->100 时，状态栏的不透明度也会相应地从 0->1。
<View style={{
    opacity: scrollY.interpolate({inputRange: [0, 100], outputRange: [0, 1]})
  }}></View>
```

这里用到了 `Animated.event()`方法，这个方法一般会结合 `ScrollView` 组件的`onScroll`属性或者`PanResponder`类里面的方法使用。

## 总结

这篇文章主要是带大家入门React Native 自带的 `Animated` 动画库，学习和了解了简单动画的画法以及复杂动画的思想。不过大多数时候，我们会发现动画经常会有卡顿的问题，下一篇文章，我们主要探讨如何解决动画卡顿的问题，以及一些处理技巧。

