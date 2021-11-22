### Redux

Redux 由三部分组成：store、reducer 和 action。

- store：是单一的数据源，而且是只读的。
- action：对变化的描述。
- reducer：是一个函数，负责对变化进行分发和处理，最终将新的数据返回给store。

在Redux的整个工作过程中，**数据流是严格单向的**。

### Redux特性

1. 单一数据源
2. 可预测性：state + action = newState
3. 纯函数更新Store

### redux的使用

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

   reducer是一个**纯函数**，最后必须返回一个state。

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

### Store

Store的创建：

由于store.dispatch()方法会触发reducer()的自动执行，所以要把reducer()传给store。

```javascript
//创建Store
const store = createStore(reducer);//store.dispatch()方法会触发reducer()的自动执行，所以要把reducer()传给store。
```

Store的三个方法：

- store.getState():对Store生成快照，得到某个时间点的数据集合，叫做state。
- store.dispatch():是View发出Action的唯一方法，会触发reducer()的自动执行
- store.subscribe(listener):设置监听函数，一旦state改变，就执行这个函数，一般来说这个函数是setState或render，实现View的自动渲染。该方法返回一个函数，调用这个函数即可解除监听。

```javascript
const state = store.getState();//对Store生成快照，得到某个时间点的数据
store.dispatch(action);	//View发出Action的唯一办法
store.subscribe(listener);
```

combineReducers()方法，负责reducer()的拆分

```javascript
//拆分前
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload
      });
    default: return state;
  }
};

//使用combineReducers拆分
//该写法前提是state的属性名称与子reducer名字相同
const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})

//state的属性名称与子reducer名字不相同则使用此写法
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
// 等同于
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
```

中间件就是对store.dispatch()进行了改造，在发出Action和执行 Reducer这两步之间添加了其他功能。

使用appleMiddlewares()方法包装中间件，该方法参数的中间件有顺序要求。

异步操作要发出两个action：用户触发第一个Action；操作结束时

