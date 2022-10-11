import React from "react";

// const ThemeContext = React.createContext(null); //
// const ThemeProvider = ThemeContext.Provider; //提供者
// const ThemeConsumer = ThemeContext.Consumer; // 订阅消费者

// // function ConsumerDemo() {
// //   const { color, background } = React.useContext(ThemeContext);
// //   return <div style={{ color, background }}>消费者</div>;
// // }
// // const Son = React.memo(() => <ConsumerDemo />); // 子组件
// function ConsumerDemo(props) {
//   const { color, background } = props;
//   return <div style={{ color, background }}>消费者</div>;
// }
// const Son = () => {
//   console.log("SON渲染");
//   return (
//     <ThemeConsumer>
//       {/* 将 context 内容转化成 props  */}
//       {(contextValue) => <ConsumerDemo {...contextValue} />}
//     </ThemeConsumer>
//   );
// };
// export default function ProviderDemo() {
//   const [contextValue, setContextValue] = React.useState({
//     color: "#ccc",
//     background: "pink",
//   });
//   return (
//     <div>
//       <ThemeProvider value={contextValue}>
//         <Son />
//       </ThemeProvider>
//       <button
//         onClick={() => setContextValue({ color: "#fff", background: "blue" })}
//       >
//         切换主题
//       </button>
//     </div>
//   );
// }
// 逐层传递Provder

// const ThemeContext = React.createContext(null);
// function Son2() {
//   return (
//     <ThemeContext.Consumer>
//       {(themeContextValue2) => {
//         const { color, background } = themeContextValue2;
//         return (
//           <div className="sonbox" style={{ color, background }}>
//             {" "}
//             第二层Provder{" "}
//           </div>
//         );
//       }}
//     </ThemeContext.Consumer>
//   );
// }
// function Son() {
//   const { color, background } = React.useContext(ThemeContext);
//   const [themeContextValue2] = React.useState({
//     color: "#fff",
//     background: "blue",
//   });
//   /* 第二层 Provder 传递内容 */
//   return (
//     <div className="box" style={{ color, background }}>
//       第一层Provder
//       <ThemeContext.Provider value={themeContextValue2}>
//         <Son2 />
//       </ThemeContext.Provider>
//     </div>
//   );
// }

// export default function Provider1Demo() {
//   const [themeContextValue] = React.useState({
//     color: "orange",
//     background: "pink",
//   });
//   /* 第一层  Provider 传递内容  */
//   return (
//     <ThemeContext.Provider value={themeContextValue}>
//       <Son />
//     </ThemeContext.Provider>
//   );
// }
export default function Index() {
  const handleClick = () => {};
  return (
    <div>
      <button onClick={handleClick}>点击</button>
    </div>
  );
}
