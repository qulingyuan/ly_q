import React, { Suspense, lazy } from "react";
import ReactDom from "react-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import StateCom from "./pages/state/StateCom";
import StateFun from "./pages/state/StateFun";
import UseEffect from "./pages/Home/UseEffect";
import FunVsClass from "./pages/FunVsClass/index";
import ClosureTrap from "./pages/ClosureTrap";
const Home = lazy(() => import(/* webpackChunkName: 'home'*/ "./pages/Home")); //给 chunk 包起名字
const About = lazy(() =>
  import(/* webpackChunkName: 'about'*/ "./pages/About")
);

function App() {
  const routerObj = [
    { name: "Home", component: Home },
    { name: "About", component: About },
    { name: "StateCom", component: StateCom },
    { name: "StateFun", component: StateFun },
    { name: "UseEffect", component: UseEffect },
    { name: "FunVsClass", component: FunVsClass },
    { name: "ClosureTrap", component: ClosureTrap },
  ];
  return (
    <div className="container">
      <ul className="leftBar">
        {routerObj.map((item) => (
          <li key={item.name}>
            <Link to={`/${item.name.toLowerCase()}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="rightContent">
        <Suspense fallback={<div>...loading</div>}>
          <Routes>
            {routerObj.map((item) => (
              <Route
                key={item.name}
                path={`/${item.name.toLowerCase()}`}
                element={<item.component />}
              />
            ))}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
export default App;
