import React, { useEffect, useLayoutEffect, useInsertionEffect } from "react";

const UseEffect = (props) => {
  useEffect(() => {
    console.log("useEffect 执行");
  }, []);
  useLayoutEffect(() => {
    console.log("useLayoutEffect执行");
  }, []);
  useInsertionEffect(() => {
    console.log("useInsertionEffect 执行");
  }, []);
  return <div></div>;
};

export default UseEffect;
