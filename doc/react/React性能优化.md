# React 性能优化

React 提供了很多优化的 API，比如 memo,useMemo,useCallback 等等，但是如何正确使用这些 api 一直是困扰我的难题。前两天很幸运看到了卡颂大佬的一场直播，听完之后感觉特别有收获，所以就把直播内容整理了出来。

## 为什么 React 需要性能优化 API



![image-20220430162251288](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220430162251288.png)

如图，在 `App` 这个组件树中，如果在 `Comment` 这个组件触发了一次更新，React 会从头开始遍历，即会从 `App` 这个组件再上一层的组件开始遍历整棵组件数。也就是从 `App` 上一层的组件开始创建一棵全新的组件树。对于除了`Comment`组件以外的节点而言，它们没有产生变化，但是 React 却重新创建了树，这就是一种性能的浪费，这时候我们就需要一些性能优化的手段，让React 跳过那些没有发生变化的组件。所以这就是为什么 React 需要性能优化的 API。

## React 性能优化应该遵循的法则

> 优化法则：将**变的部分**与**不变部分**分离。

变的部分有以下三种：

1. props
2. state
3. context

其实 `props` 和 `context` 都是由 `state` 演变过来的。父组件的 `state` 传给子组件，就成为了子组件的 `props`；父组件的 `state` 传到了 `context` 里，就成为一个子孙组件的 `context` 了。

### 案例1

```react
import { useState } from "react";

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的组件 render");
  return <p>耗时的组件</p>;
}

export default function App() {
  const [num, updateNum] = useState(0);

  return (
    <div>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
      <ExpensiveCpn />
    </div>
  );
}
```

结果如图：

![2022-04-30_15-49-58 (2)](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022-04-30_15-49-58%20(2).gif)

上面代码，在 input 中，每触发一次输入操作，控制台就会输出一次，这表明`<App>`组件更新的时候，`App`的子组件`ExpensiveCpn`组件都会 render。

根据分离原则，我们把 `App` 中变的部分，也就是 `state` 分离出来：

```react
import { useState } from "react";

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的组件 render");
  return <p>耗时的组件</p>;
}

function Input() {
  const [num, updateNum] = useState(0);
  return (
    <>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
    </>
  );
}

export default function App() {
  return (
    <div>
      <Input />
      <ExpensiveCpn />
    </div>
  );
}

```

结果如图：

![2022-04-30_16-52-47 (1)](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022-04-30_16-52-47%20(1).gif)

此时，输入操作不会触发`ExpensiveCpn`的 render 了。可以看到，如果代码的组织结构得当，不需要性能优化api 的。

### 案例 2

```react
import { useState } from "react";

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的组件 render");
  return <p>耗时的组件</p>;
}

export default function App() {
  const [num, updateNum] = useState(0);
  return (
    <div title={num + ""}>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
      <ExpensiveCpn />
    </div>
  );
}
```

案例 2 和案例 1 相比，`ExpensiveCpn`仍然会重新渲染，唯一区别是 `App` 组件最外层也用到了 `state`，这就导致我们无法像案例一那样进行分离，我们可以利用 `children` 来进行 `state` 的分离：

```react
import { ReactNode, useState } from "react";

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的组件 render");
  return <p>耗时的组件</p>;
}

function InputWrapper({ children }: { children: ReactNode }) {
  const [num, updateNum] = useState(0);

  return (
    <div title={num + ""}>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <InputWrapper>
      <ExpensiveCpn />
    </InputWrapper>
  );
}
```

此时 `App` 中没有 `state`、`props`、`context`，所以它就是一个“不变”的组件，不变的部分就会被 React 性能优化掉。

上面两个例子中，我们把父组件中变的部分抽离出来，但起到性能优化效果的是子孙组件。所以我们可以发现一个规律：当父组件满足性能优化条件时，子孙组件可能命中性能优化。

为什么会这样呢？

因为刚才说到，对于一个React 组件，props 是从父组件传过来的，只有当父组件满足了性能优化的条件以后，父组件传过来的 props 才是不变的。**在父组件传过来的 `props` 不变的情况下，子组件还需要满足自己的 `state` 和 `context` 不变，此时子组件才会命中性能优化。**

性能优化的目的是让组件不执行，组件不执行的前提是组件执行和不执行的返回值相同。能够改变组件返回值的也就是 `props`、`state`、`context`，当这三者都不变的情况下，就能够保证返回值是相同的。

### 如何判断三者是否变化

对于上面例子中的 `state` 因为是基本类型，可以使用全等比较； `context`不太常用，可以使用浅比较。

对于 `props`，有两种比较的方式可以选择：

- 全等比较(比较引用地址)-----高效、但不易命中

- 浅比较(遍历对象的属性)-----不高效、但容易命中

**React 默认使用全等比较来比较 props。**

### 案例 3

```react
import React, {useState, useContext} from 'react';

const numCtx = React.createContext<number>(0);
const updateNumCtx = React.createContext<React.Dispatch<number>>(() => {});

function Button() {
  const updateNum = useContext(updateNumCtx);
  console.log('btn render')
  return (
    <button onClick={() => updateNum(Math.random())}>产生随机数</button>
  )
}

function Show() {
  const num = useContext(numCtx);
  return <p>num is: {num}</p>;
}

const Middle = () => {
  return (
    <>
      <Button/>
      <Show/>
    </>
  )
}

export default function App() {
  const [num, updateNum] = useState(0);

  return (
    <numCtx.Provider value={num}>
      <updateNumCtx.Provider value={updateNum}>
        <Middle/>
      </updateNumCtx.Provider>
    </numCtx.Provider>
  );
}
```

上面代码中，`updateNum`作为一个 dispatch，是不变的。`App`，`Show` 是变化的；`Middle`，`Button` 是不变的。`Button` 是 `Middle` 的子节点，按照之前的说法，是否意味着，更新后 `Button` 不会 `render` 呢？

来看结果：

![2022-04-30_19-43-51 (1)](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022-04-30_19-43-51%20(1).gif)



显然，更新 `App` 时，`Button` render 了。

分析一下过程：

首先 `App` 组件由于包含变的部分，所以 render 了，子组件会从父组件中取到 `props`，`Middle` 看起来没有 `props`，但其实它的 `props` 是一个空对象。由于 React 默认使用全等来比较 `props`，所以两个空对象比较结果为不等。所以 `Middle` 组件的 `props`前后比较是不同的，所以 `Middle` 不会命中性能优化 。进而可以推出其子组件`Button` 的 `props` 也是一个空对象。

如下图：

![image-20220430215444656](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220430215444656.png)



![image-20220430202014513](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220430202014513.png)

一个没有任何 props 的组件，它的 props 是空对象`{}`。

由上可知，当组件树从某一节点开始不能命中性能优化以后，由于 `props` 全等比较的方式一直会传染下去，即使那个节点的子孙结点的代码结构都很完美，最终也会导致整个子树都无法命中性能优化。这就是为什么我们需要性能优化 api。

将 `Middle` 使用 `memo` 进行优化后：

```react
const Middle = React.memo(() => {
  return (
    <>
      <Button />
      <Show />
    </>
  );
});
```

此时 debug 看一下 `Button` 的 `oldProps` 和 `newProps` 如图：

![image-20220430222708425](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220430222708425.png)

可以发现，在 `Button` 中，我们并没有使用 react.memo 来进行优化，即 `Button` 的 `props` 仍然是默认使用的全能比较，但结果仍然为 `true`。因为 `Button` 的 `props` 是 `Middle` 满足了性能优化条件之后传给 `Button` 的，也就是复用了之前的 `props`，是同一个 `props`。同时，`Button` 又满足没有 `state`，`context` 也是不变的，所以 `Button` 命中了性能优化。

本案例使用 `useMemo` 也能达到 `memo` 的效果：

```react
const Middle = () => {
  return useMemo(
    () => (
      <>
        <Button />
        <Show />
      </>
    ),[]);
};
```

分析：

`useMemo` 第二个参数为空数组，表示 `useMemo` 返回的值始终不变。不管 `Middle` 渲染几次，`useMemo` 都返回同一个值。相当于 `Button` 的 `props` 永远不会变，始终是同一个对象。通过 `useMemo` 间接满足了 `Button` 取到的 `props` 始终是全等的。

### 案例 4

```react
import React, { useState } from "react";

function Input() {
  const [num, updateNum] = useState(0);

  return (
    <>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
    </>
  );
}

function ExpensiveGrandChild() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的孙组件 render");
  return <p>耗时的组件</p>;
}

function ExpensiveChild() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的子组件 render");
  return <ExpensiveGrandChild />;
}

function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的组件 render");
  return <ExpensiveChild />;
}

export default function App() {
  return (
    <div>
      <Input />
      <ExpensiveCpn />
    </div>
  );
}
```

运行结果：

![2022-04-30_22-52-16 (1)](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022-04-30_22-52-16%20(1).gif)

当满足性能优化条件以后，整个链路上的子孙组件都不会 render。

所以这就是为什么 React 虽然每次更新都要遍历整棵组件树，但是只要优化得当，性能不会很差。当整棵子树都命中性能优化策略后，该子树是能够完整的被跳过的。

回到文章开头的案例，如果我们优化得当，那么最终达到的效果应该是只有 `App`，`Body`以及`Comment` 这个链路上的组件更新了，而其他不相关的组件都不需要 render。

## 总结

1. 使用 `devtool` 寻找项目中的性能损耗严重的子树
2. 在自述的根节点使用性能优化 API
3. 子树中运用变与不变分离法则
