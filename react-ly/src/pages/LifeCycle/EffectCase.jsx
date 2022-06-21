import React, { useEffect, useState } from "react";

const EffectCase = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    return () => {
      console.log("究极卸载");
    };
  }, []);
  useEffect(() => {
    console.log("effect: " + count);
    return () => {
      console.log("卸载咯");
    };
  }, [count]);

  const handleClick = () => {
    setCount((pre) => pre + 1);
  };
  console.log("render: " + count);
  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>点赞</button>
    </div>
  );
};
export default EffectCase;
