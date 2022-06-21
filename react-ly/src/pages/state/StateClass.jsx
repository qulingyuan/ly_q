import * as React from "react";

class StateClass1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>setState参数为对象的add</button>
        <h2>{this.state.count}</h2>
      </div>
    );
  }
}
class StateClass2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState((prevState, props) => {
      return { count: prevState.count + 1 };
    });
    this.setState((prevState, props) => {
      return { count: prevState.count + 1 };
    });
    console.log(this.state.count);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>setState参数为函数的add</button>
        <h2>{this.state.count}</h2>
      </div>
    );
  }
}

export default class StateClass extends React.Component {
  render() {
    return (
      <>
        <h2>类组件的 state 合并问题</h2>
        <StateClass1 />
        <StateClass2 />
      </>
    );
  }
}
