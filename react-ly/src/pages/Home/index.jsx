import React, { Component } from "react";
import "./index.less";

export default class Home extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    console.log("完成");
  }
  shouldComponentUpdate() {}
  render() {
    return <div></div>;
  }
}
