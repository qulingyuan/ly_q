### 为什么要发明Hooks？

React 并没有利用 Class 的所有功能。一方面，React组件之间不会互相继承，所以React没有利用到Class的继承特性的。另一方面，所有UI都是由状态驱动的，因此很少会在外部去调用一个类实例（即组件）的方法。组件的所有方法都是在内部调用，或者作为生命周期方法被自动调用的。

因此通过函数去描述一个组件才是最自然的方式，但是函数式组件无法存在内部状态，所以要解决这个问题，产生了hooks。

### Hooks 优势

更好地体现了 React 的开发思想，即从 State => View 的函数式映射。

1. 简化了逻辑复用
2. 有助于关注点分离

### useState

让函数组件具有维持状态的能力。即在一个函数的多次渲染之间，useState 可以让函数组件具有维持状态的能力。

state中永远不要保存可以通过计算得到的值：

1. 从 props 传递过来的值，即便该值是需要二次计算的。
2. 从 URL 中读到的值
3. 从 cookie、localStorage 中读取的值。

state的弊端：组件由自己的状态，意味着组件如果重新创建，就需要有恢复状态的过程，这通常会让组件变得更复杂。例如组件中有服务器端请求，并将结果放入本地的state中，那么每个用到这个组件的地方，都需要重新获取一遍。这种情况用Redux来管理就更好，可以让组件无状态，更易维护。

### useEffect

useEffect 用于执行一段副作用。即一段和当前执行结果无关的代码。useEffect 中代码的执行是不影响渲染出来的UI的。

useEffect 是每次组件 render 完后判断依赖并执行。

useEffect 内不能直接写async函数，需要封装一下。

```javascript
// useEffect 的 callback 要避免直接的 async 函数，需要封装一下
useEffect(callback, dependencies)
```

1. 每次 render 后执行：不提供第二个依赖项参数。比如
   useEffect(() => {})。
2. 仅第一次 render 后执行：提供一个空数组作为依赖项。比如
   useEffect(() => {}, [])。
3. 第一次以及依赖项发生变化后执行：提供依赖项数组。比如
   useEffect(() => {}, [deps])。
4. 组件 unmount 后执行：返回一个回调函数。比如
   `useEffect() => { return () => {} }, [])`

定义依赖项的时候需要注意：

1. 依赖项中定义的变量一定是会在回调函数中用到的，否则声明的依赖项没有意义。
2. 依赖项一般是一个常量数组，而不是一个变量。因为一般在创建 callback 的时候，就非常清楚其中要用到哪些依赖项了。
3. React 会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。如果是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。这是一个刚开始使用Hooks很容易导致Bug的地方。

浅比较: 基本类型会比较值是否相等 复杂类型会比较引用地址是否相等,如===  

深比较: 复杂类型递归遍历里面的每一个属性值是否相等

useEffect 中 callback 返回的函数在**下一次依赖项发生变化之前**（每次Effect重新执行**之前**都会执行，用于清理上一次Effect的执行结果）以及**组件销毁之前**执行，而 componentWillUnmount 只会在组件销毁时才会执行。

如果只想实现 componentWillUnmount，即只在组件销毁时执行，则：

```react
useEffect(() => { 
	return () => {
		//这里只会在组件销毁前(componentWillUnmount)执行一次
		}
}, []);
```



### Hooks 使用规则

Hooks 只能在函数组件的顶级作用域使用。即 Hooks 不能在循环、条件判断或者嵌套函数内执行，而必须是在顶层。

Hooks 在组件的多次渲染之间，必须按顺序被执行。因为在React 组件内部，维护了一个对应组件的固定 Hooks 执行列表，以便在多次渲染之间保持 Hooks 的状态，并做对比。

总结为两点：

1. 所有 Hooks 必须被执行到。
2. Hooks 必须按顺序执行。

Hooks 使用位置：

1. 在函数组件内
2. 在自定义的 Hooks 里面。

想要在 Class 组件中使用 Hooks，可以利用高阶组件的模式，将 Hooks 封装成高阶组件，从而让类组件使用。



### useCallback & useMemo

useCallback缓存的是一个函数，而useMemo缓存的是计算的结果。

二者可以避免重复计算以及子组件的重复渲染。

useCallback 的工鞥那可以用 useMemo 来实现。

```javascript
useCallback(fn,deps) 
相当于 
useMemo(()=>fn,deps)
```

useCallback 空数组没有意义，相当于每次都创建了一个函数。

### useRef

两个功能

1. useRef在多次渲染之间共享数据。

   和useState的区别：使用useRef保存的值发生变化时，不会触发组件的重新渲染。

2. 保存某个DOM节点的引用。

### useContext

配合React.createContext来进行跨多层级状态的管理。

Context发生变化，所有用到这个Context的地方都会自动刷新。

一般用来保存主题。

### 函数式组件生命周期的理解

React的本质：从 Model 到 View 的映射。

函数组件中的思考方式：当某个状态变化时，我要做什么。

Class组件中的思考方式：某个生命周期方法中我要做什么。

可以利用 useRef 来实现 useSingleton 这样的一次性执行某段代码的自定义 Hook，（相当于 Class 组件的constructor）:

```react

import { useRef } from 'react';

// 创建一个自定义 Hook 用于执行一次性代码
function useSingleton(callback) {
  // 用一个 called ref 标记 callback 是否执行过
  const called = useRef(false);
  // 如果已经执行过，则直接返回
  if (called.current) return;
  // 第一次调用时直接执行
  callBack();
  // 设置标记为已执行过
  called.current = true;
}
```

在函数式组件中这样使用：

```react

import useSingleton from './useSingleton';

const MyComp = () => {
  // 使用自定义 Hook
  useSingleton(() => {
    console.log('这段代码只执行一次');
  });
  return (
    <div>My Component</div>
  );
};
```

### 创建自定义 Hooks

声明一个名字以 use 开头的函数，且函数内部调用了其他的 Hooks（内置的或自定义的都可）。



### Redux

Redux Store 的两个特点：

1. Redux Store 是全局唯一的。
2. Redux Store 是树状结构。

Redux的特点：

1. 跨组件的状态共享。
2. 通组件多个实例的状态共享。

Redux 概念：

- State 即 Store，一般是一个纯 JavaScript Object。
- Action 也就是一个 Object，用于描述发生的动作。
- 而 Reducer 则是一个函数，接收 Action 和 State 并作为参数，通过计算得到新的 Store。

