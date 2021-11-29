## 高阶组件

高阶函数是以函数作为参数，返回值也是函数的函数。类似于高阶函数，高阶组件是以组件作为参数，返回一个组件的函数。Redux的connect和Relay的createFragmentContainer都用到了HOC，高阶组件具有以下特性：

### 属性代理

#### 操作props

高阶函数可以拦截props，对props做一定的处理后传递给被包装的组件。

```react
const HOC = function(WrappedComponent) {
  return class WrapperComponent extends React.Component {
    render() {
      const newProps = {
        ...this.props,
        name: 'HOC'
      }
      return <WrappedComponent {...newProps}/>
    }
  }
}
```

处理后，被包装组件内部即可使用props.name。

#### 获取refs引用

对于高阶组件，在父组件中获取被封装组件的refs，取得的是高阶组件的引用。要想获得被封装组件的引用，应该通过props传入一个回调函数将被封装组件的this从父组件中返回。代码如下：

```react
import React from "react";
import ReactDOM from "react-dom";
// HOC
function withRouter(ChildComponent) {
  return class extends React.Component {
    render() {
      return <ChildComponent {...this.props} />;
    }
  };
}
// 子组件
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { getInstance } = props;
    if (typeof getInstance === "function") {
      getInstance(this); // 在这里把this暴露给`parentComponent`
    }
  }
  render() {
    return <div ref="test">这是子组件</div>;
  }
}
// 使用 HOC
const ChildComponent = withRouter(Component);
// 父组件
class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // childCP 是真正的子组件
    // childCpWrapper 是被包装的子组件
    console.log(this.childCp);
    console.log(this.childCpWrapper);
  }
  render() {
    return (
      <ChildComponent
        ref={(withRouter) => {
          this.childCpWrapper = withRouter;
        }} // 这里获取的是`withRouter`组件，一般没啥用，这里写出来只是为了对比
        getInstance={(childCp) => {
          this.childCp = childCp;
        }} // 这里通过`getInstance`传一个回调函数接收`childComponent`实例即可
      />
    );
  }
}

ReactDOM.render(<ParentComponent />, document.getElementById("root"));

```

#### 抽象state

一个常用场景：利用高阶组件将受控组件需要自己维护的状态统一提升到高阶组件中。

```React
const HOC = function(WrappedComponent) {
  class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        name: ''
      }
  }

  onNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    //注意这里newProps必须写到render里，因为使用了this.state和this.onChange
    const newProps = {
      name: {
        value: this.state.name,
        onChange: this.onNameChange
      }
    }
    return <WrappedComponent {...this.props} {...newProps} />
  }
}
```

这样我们在使用受控组件的时，简单包装即可：

```react
class WrappedComponent extends Component {
  render() {
    return <input name="name" {...this.props.name} />
  }
}
const ComponentWithControlledState = HOC(WrappedComponent)
```

### 渲染劫持











