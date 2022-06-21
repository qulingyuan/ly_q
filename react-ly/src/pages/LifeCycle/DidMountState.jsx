import * as React from "react";

export default class DidMountState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ count: this.state.count + 1 }, () => {
      console.log("setState: " + this.state.count);
    });
    console.log("handleclick: " + this.state.count);
  }
  componentDidUpdate() {
    console.log("didMount: " + this.state.count);
  }

  render() {
    console.log("render: " + this.state.count);
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.handleClick}>点赞</button>
      </div>
    );
  }
}
