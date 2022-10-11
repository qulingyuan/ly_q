import { Component, createContext, useContext, useState } from "react";
import React from "react";

const Context = createContext("ly_qu");
function One() {
  const [color, setColor] = useState("dark");
  return (
    <>
      <Context.Provider value={color}>
        <div className="one">
          <h1>One</h1>
          <Two></Two>
        </div>
      </Context.Provider>
      <button
        style={{}}
        onClick={() => {
          setColor(color === "dark" ? "white" : "dark");
        }}
      >
        切换颜色
      </button>
    </>
  );
}

function Two() {
  console.log("Two渲染了");
  return (
    <div className="two">
      <h1>Two</h1>
      <Three></Three>
      <Context.Consumer>
        {(contextValue) => <Four contextValue={contextValue}></Four>}
      </Context.Consumer>
      <Five></Five>
    </div>
  );
}
//useContext-只适用于函数组件
function Three() {
  const ctx = useContext(Context);
  console.log("Three渲染了");
  return (
    <div className="three">
      <h1>Three</h1>
      <p>{ctx}</p>
      <Six />
    </div>
  );
}
//Consumer-使用render props的方式，相当于把 context 变成 props；
class Four extends Component {
  render() {
    console.log("Four渲染了");

    return (
      <div className="Four">
        <h1>Four</h1>
        <p>{this.props.contextValue}</p>
      </div>
    );
  }
}

//contextType-只适用于类组件
class Five extends Component {
  static contextType = Context;

  render() {
    console.log("Five渲染了");

    return (
      <div className="Five">
        <h1>Five</h1>
        <p>{this.context}</p>
      </div>
    );
  }
}
function Six() {
  console.log("Six渲染了");
  return <h1>Six</h1>;
}
export default One;
