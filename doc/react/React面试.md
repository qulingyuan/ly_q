## JSX的本质是什么

JSX 是 JavaScript 的一种语法扩展，它和模板语言很接近，充分具备 JavaScript 的能力。JSX会被Babel编译成 `React.createElement()`， `React.createElement(type,config,children)`返回一个叫做`ReactElement`的JS对象。

`ReactElement` 对象实例，本质上是以 JavaScript 对象形式存在的对DOM的描述，即**虚拟DOM**(的一个节点)。虚拟DOM通过`ReactDOM.render(element,container,[callback])`渲染成真实DOM。

## 生命周期

#### 挂载阶段

1. `constructor(props)`

   - state初始化

   - 为事件处理函数绑定实例

2. `static getDerivedStateFromProps(props, state)`

   - props 和 state 分别为当前组件接收到的来自父组件的 props 和当前组件自身的 state。

   - 作用(唯一)：使组件在props变化时更新state，必须要有返回值，为对象格式或null。

   - 触发时机：
     - 当props被传入时
     - state发生变化时
     - `forceUpdate()`被调用时
   - 该方法为静态方法，故内部访问不到this。

3. `render()`

   class 组件中唯一必须实现的方法，且为纯函数。

   不操作真实DOM，职能是**把需要渲染的内容返回出来**。

4. `componentDidMount()`

   组件挂载(插入DOM树)后立即调用，故可操作真实DOM。

   网络请求，添加订阅。

   可在此处调用`setState()`，会触发额外渲染，该额外渲染会发生在浏览器更新屏幕之前。

#### 更新阶段

1. `static getDerivedStateFromProps(props,state)`

   见上述。

2. `shouldComponentUpdate(nextProps, nextState)`

   只作为性能优化而存在，根据其返回值决定是否执行该方法之后的生命周期，进而决定是否对组件 re-render(重渲染)。

3. `render()`

   见上述。

4. `getSnapshotBeforeUpdate(prevProps, prevState)`

   执行时机：render方法之后，真实DOM更新之前。故可以获取到更新前的真实DOM和更新前后的 state & props 信息。

   返回值作为第三个参数给到`componentDidUpdate()`

5. `componentDidUpdate(prevProps, prevState, snapshot)`

   DOM更新后立即执行，可在此处对DOM进行操作。

   也可以在此处对更新前后的props进行比较，发送请求。

   可在此处调用`setState()`，但必须在条件语句中，不然会死循环。

#### 卸载阶段

`componentWillUnmount()`

组件销毁前执行：

1. 组件在父组件中被移除了。
2. 组件中设置了 key 属性，父组件在render的过程中，发现key值和上一次不一致，那么该组件就会被干掉。

## Fiber架构

React16改造生命周期的主要动机是为了配合Fiber架构带来的异步渲染机制。

Fiber会使原本同步的渲染过程变成异步的。

在React16之前，每次组件更新，都会构建一棵新的虚拟DOM树与上一次的虚拟DOM树做diff，该过程为递归的。

同步渲染的递归调用栈非常深，只有最底层的返回了，整个渲染才会开始逐层返回，这个漫长且**无法打断**的更新过程，将会带来用户体验层面的巨大风险：同步渲染一旦开始，便会牢牢抓住主线程不放，直到递归彻底完成。在这个过程中，浏览器没有办法处理整个渲染之外的任何事情，会进入一种**无法处理用户交互**的状态。因此若渲染时间稍微长一点，页面就会面临卡顿甚至卡死的风险。

**Fiber会将一个大的更新任务拆解为许多个小任务**。每执行完一个小任务，渲染线程都会把主线程交回去，看看有没有优先级更高的工作要处理，确保不会出现其他任务被“饿死”的情况，进而避免同步渲染带来的卡顿。在这个过程中，渲染线程不再“一去不回头”，而是**可以被打断**的，这就是所谓的“**异步渲染**”。

**根据“能否被打断”这一标准**，React16的生命周期又分为 render和 commit 两个阶段，而 commit 阶段又被细分为了 pre-commit 和 commit。

- render 阶段：纯净且没有副作用，可能会被React暂停、终止或重新启动。
- pre-commit 阶段：可以读取 DOM。
- commit 阶段：可以使用DOM，运行副作用，安排更新。

总的来说，**render 阶段在执行过程中允许被打断，而 commit 阶段则总是同步执行的。**

因为render阶段用户“不可见”，而commit阶段涉及真实DOM的渲染，故必须同步渲染求稳。

Fiber机制下，render阶段被重启的形式是“**重复执行一遍整个任务**”而非“接着上次执行到的那行代码往下走”。这就导致 **render 阶段的生命周期都是有可能被重复执行的**。

所以React16被废弃的生命周期都是处于render阶段，都可能重复被执行。

## React中的数据流动

React的视图会随着数据的变化而变化。

- 使用基于Props的单向数据流串联父子、兄弟组件。
- 利用”发布-订阅“模式驱动React数据在任意组件间流动。
- Context API
- Redux

### 发布订阅

手写EventEmitter

```javascript
class myEventEmitter{
    constructor(){
        //eventMap用来存储事件和监听函数之间的联系
        this.eventMap = {};
    }
    //type这里就代表事件的名称
    on(type,handler){
        //handler必须是函数
        if(!(handler instanceof Function)){
            throw new Error("请传入一个函数");
        }
        //判断type事件对应的队列是否存在
        if(!this.eventMap[type]){
            //若不存在，新建该队列
            this.eventMap[type] = [];
        }
        //若存在，直接往队列里推入handler
        this.eventMap[type].push(handler);
    }
    //触发时是可以携带数据的，params就是数据的载体
    emit(type,params){
        //假设该事件是有订阅的(对应的事件队列存在)
        if(this.eventMap[type]){
            //将事件队列里的handler依次执行出队
            this.eventMap[type].forEach((handler,index)=>{
                //注意别忘了读取params
                handler(params);
            })
        }
    }
    off(type,handler){
        if(this.eventMap[type]){
            this.eventMap[type].splice(this.eventMap[type].indexOf(handler)>>>0,1)
        }
    }
}

const myEvent = new myEventEmitter();
const testHandler = function (params){
    console.log(`test事件触发了，testHandler接收到的入参是${params}`);
}
myEvent.on("test",testHandler);
myEvent.emit("test","newState");
```



### Context API

- React.createContext：创建一个context对象，包含Provider和Consumer。
- Provider：数据的提供者。对组件树中的根组件进行包裹，传入属性以供子组件消费。
- Consumer：数据的消费者。不仅能够读取到Provider下发的数据，还能读取到这些数据后续的更新。接受一个函数作为子元素，该函数需要返回一个组件。

注意： Consumer 没有对应的 Provider 时，value 参数会直接取创建 context 时传递给 createContext 的 defaultValue。

新的Context API即使在组件的shouldComponentUpdate返回false，它仍然可以”穿透“组件继续向后代组件进行传播，进而保证了数据生产者和数据消费者之间数据的一致性。

### Redux

Redux 由三部分组成：store、reducer 和 action。

- store：是单一的数据源，而且是只读的。
- action：对变化的描述。
- reducer：是一个函数，负责对变化进行分发和处理，最终将新的数据返回给store。

在Redux的整个工作过程中，**数据流是严格单向的**。

#### redux的使用

1. ##### 使用createStore创建store，有三个入参。

   - reducer，该参数必须传入，另外两个可选

   - 初始状态内容

   - 指定中间件

   ```react
   const store = createStore(
     	reducer,	//只有此参数必须传,reducer为store的更新规则
     	initial_state,	//初始状态内容
     	applyMiddleware(middleware1,middleware2,...)	//指定中间件
   );
   ```

2. ##### reducer作用是将新的state返回给store。

   reducer是一个纯函数，最后必须返回一个state。

3. ##### action的作用是通知reducer”让改变发生“。

   action是一个对象，type是action的唯一标识，是必须传入的属性。

4. ##### store.dispatch(action) 负责派发 action 从而让 reducer 感知到 action。

演示代码如下：

```react
import { createStore } from 'redux'
// 创建 reducer
const reducer = (state, action) => {
    // 此处是各种样的 state处理逻辑
    return new_state;
}
// 基于 reducer 创建 state
const store = createStore(reducer);
// 创建一个 action，这个 action 用 “ADD_ITEM” 来标识 
const action = {
  type: "ADD_ITEM",
  payload: '<li>text</li>'
}
// 使用 dispatch 派发 action，action 会进入到 reducer 里触发对应的更新
store.dispatch(action);
```

## 类组件 vs 函数组件

类组件是**面向对象编程思想**的一种表征。

类组件的关注点是生命周期，业务逻辑和生命周期耦合在一起。

react类组件内部预设了太多”现成的东西“，所以很重。

类组件的逻辑和组件是粘在一起的，内部逻辑难以实现拆分和复用。

this绑定书写麻烦，且容易出问题，因为虽然props是不可变的，但this是可变的。



函数组件是**函数式编程**思想的一种表征。

函数组件关注点在业务逻辑的拆分。

React-Hooks 是一个自由选择和使用的工具。

函数组件更符合React根据数据更新视图的设计理念。

函数组件的关注点在事件。

props会在函数组件执行的一瞬间就被捕获，所以不会变化。

**函数组件会捕获 render 内部的状态，这是这两种组件最大的不同。**

useEffect是异步的，要等到浏览器将所有变化渲染到屏幕后才会被执行。而useLayoutEffect是同步的。所以应该尽可能使用标准的useEffect以避免阻塞视觉更新。

## React-Hooks

react使用原则：

1. 只在React函数组件中调用Hook
2. 不要在循环、条件或嵌套函数中调用Hook

目的：确保Hooks在每次渲染时都保持同样的执行顺序。

hook相关的所有信息封装在一个hook对象里，而hook对象之间以单向链表的形式相互串联。

hooks**首次渲染**和**更新渲染**分别对应mountState和updateState，其中：

mountState**构建链表并渲染**。

updateState**依次遍历构建好的链表并渲染**。

## 虚拟DOM

### 虚拟DOM是什么

虚拟DOM本质上是JS和DOM之间的一个映射缓存。

- 虚拟DOM是JS对象。
- 虚拟DOM是对真实DOM的描述。

### 虚拟DOM如何工作

- 挂载阶段：React 结合JSX的描述，构建出虚拟DOM树，然后通过`ReactDOM.render`实现虚拟DOM到真实DOM的映射（触发渲染流水线）。
- 更新阶段：页面的变化先作用于虚拟DOM，虚拟DOM将在JS层借助算法先对比出具体有哪些真实DOM需要被改变，然后再将这些改变作用于真实DOM。即先**diff**出需更新的内容，然后**patch**到真实DOM上。

虚拟DOM解决的问题：

- 为数据驱动视图这一思想提供了载体，使得前端开发能够基于函数式UI的编程方式实现声明式编程。说白了就是**为diff算法提供了可能**。
- 解决跨平台问题。
- batch函数缓存多次的diff，实现集中化的DOM批量更新。

## React15-栈调和(Stack Reconciler)

栈调和是React15的diff算法，是一个同步的递归过程。

通过如ReactDOM等类库使虚拟DOM与真实DOM同步，这一过程叫作协调（调和）。

两个树找不同的算法正常的时间复杂度为O(n^3)，是树的深度优先遍历。

Diff算法的前提：

- 同类型的组件拥有相同的DOM树形结构。
- 处于同一层级的节点通过设置key作为唯一标识。
- DOM节点之间跨层级操作不多，同层级操作是主流。

Diff算法细节：

1. 分层对比，同层级节点进行比较。
2. 同层级节点顺序发生变化，直接交换顺序即可。
3. 节点跨层级移动，则直接清除原节点重建新节点。
4. 节点类型发生变化，则直接放弃该节点及其子树的比较，直接清除整个树并新建节点。

## React15-setState同步or异步

setState异步的动机——避免频繁的re-render。

setState在React钩子函数及合成事件中，表现为异步；在setTimeout、DOM原生事件中，表现为同步。这种差异本质上是由React**事务机制**和**批量更新机制**的工作方式来决定的。

isBatchingUpdates标识着当前是否处于批量创建/更新组件的阶段，使用“任务锁”的思想。在React生命周期函数以及合成事件执行前，就被偷偷修改为true，需要更新的组件都只能暂时进入dirtyComponents里排队等候下一次的批量更新。当函数执行完毕后，事务的close方法会再把isBatchingUpdates改为false。

## Fiber架构

### React15

栈调和(Stack Reconciler)是一个同步的递归过程，其diff算法其实是树的深度优先遍历，这个过程是同步的，不可被打断的。遇到庞大的虚拟DOM树时，页面容易卡顿。

Reconciler负责对比出新老虚拟DOM的变化，Renderer负责将变化的部分应用到视图上。从Reconciler到Renderer这个过程严格同步。

### React16

在React15的Reconciler的前面多了一个Scheduler(调度器)，每个更新任务都会被赋予一个优先级。后进来的高优先级任务可以中断在其前面进入的低优先级的任务，高优先级任务完成渲染后，则执行前面被中断的任务。

## ReactDOM.render

ReactDOM.render的调用栈分为三个阶段：

1. 初始化阶段
2. render阶段
3. commit阶段

### 初始化阶段

完成Fiber树中基本实体的创建。

