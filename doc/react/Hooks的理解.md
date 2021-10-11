### 从一个全新的角度学习hooks

在理解Hooks时，我们经常使用 Class Component的生命周期来类比Hooks的执行时机，这是一个非常不好的办法。首先，这种方式根本没有办法准确的类比；其次，随着React18的到来，新的API offScreen可能对Hooks的执行时机造成影响。所以我们从一个全新的角度来理解Hooks。

首先，我们初中时学习过二元一次方程 `y = 2x+1`，其中 x 的变化会导致 y 的变化，这里 x 为自变量，y 为因变量。

按照这个理解，我们同样可以把React Hooks中的use函数分类为自变量和因变量：

- 自变量：useState、useReducer、useContext
- 因变量：useMemo、useEffect、useCallback
- useRef。



```
import { useCallback, useMemo, useState, useEffect, useRef } from "react";

function Count({ data }) {
  return <i>{data}</i>;
}

export default function Hooks() {
  const [x, setX] = useState(0); // x是自变量

  const y = 2 * x + 1; //y是因变量
  const changeX = () => {
    setX(x + 1);
  };
  // const y = useMemo(() => 2 * x + 1, [x]); //useMemo用来缓存一个因变量,需显示指定该因变量依赖的自变量。
  // const changeX = useCallback(() => {
  //   //useCallback用来缓存一个函数类型的因变量，同样需要显式指定该因变量以来的自变量。
  //   setX(x + 1);
  // }, [x]);
  // 使用useMemo、useCallback 的好处：
  // 当使用时，y与changeX会被缓存下来，只要x不变，始终读取的是缓存的值。
  // 不使用时，每次函数组件执行时，实际会基于x，创建新的y与changeX。
  // 使用建议：在遇到性能瓶颈之前，都可以不使用这两个Hooks

  const renderCountRef = useRef(1);
  const isOdd = renderCountRef.current % 2 !== 0;
  renderCountRef.current++;
  console.log(renderCountRef.current, isOdd);

  // 组件的功能不仅局限于描述视图，还能产生副作用。
  //副作用是函数式编程中的概念：对于一个函数，相同的输入，总是会的到相同的输出，并且在执行过程中没有任何副作用。
  //在函数组件中，可以通过useEffect来定义有副作用的因变量，例如请求数据，操作DOM等操作。
  useEffect(() => {
    //自变量导致因变量变化后，因变量不仅可以作用于视图，也能触发副作用
    document.title = x;
    // renderCountRef.current++; //放到useEffect里面可以正确执行，放到外面就有问题
    console.log("useEffect" + renderCountRef.current, isOdd);
  }, [x]);
  return (
    <ul onClick={changeX}>
      {/* <li>x是{x}</li>
      <li>y是{y}</li> */}
      {isOdd ? (
        <li>
          x是
          <Count data={x} />
        </li>
      ) : null}
      <li>
        y是
        <Count data={y} />
      </li>
    </ul>
  );
}

//useState定义自变量
//useMemo和useCallback定义无副作用的因变量
//useEffect定义有副作用的因变量
//useReducer可以看做是进阶版的useState，它使用redux的理念将多个state合并为一个，本质上也为自变量
//useContext用来跨层级传递自变量。

```

