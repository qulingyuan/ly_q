import * as React from "react";
import { useState } from "react";

function StateFun1() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
  };
  return (
    <div>
      <button onClick={handleClick}>setState参数为对象的add</button>
      <h2>{count}</h2>
    </div>
  );
}

function StateFun2() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };
  return (
    <div>
      <button onClick={handleClick}>setState参数为函数的add</button>
      <h2>{count}</h2>
    </div>
  );
}

export default function StateFun() {
  return (
    <>
      <h2>函数组件的 state 合并问题</h2>
      <StateFun1 />
      <StateFun2 />
    </>
  );
}
