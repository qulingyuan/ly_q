import React, { Suspense, lazy } from "react";
// import Home from "./pages/Home";
// import About from "./pages/About";
import "./App.css";
import { Link, NavLink, Routes, Route } from "react-router-dom";
import StateFuncVsClass from "./pages/state/StateFuncVsClass";
import UseEffect from "./pages/Home/UseEffect";
import FunVsClass from "./pages/FunVsClass/index";
import ClosureTrap from "./pages/ClosureTrap";
import DidMountState from "./pages/LifeCycle/DidMountState";
import EffectCase from "./pages/LifeCycle/EffectCase";
import Context from "./pages/Context/index";
import ContextDemo1 from "./pages/Context/demo1";
const Home = lazy(() => import(/* webpackChunkName: 'home'*/ "./pages/Home")); //给 chunk 包起名字
const About = lazy(() =>
  import(/* webpackChunkName: 'about'*/ "./pages/About")
);

function App() {
  const routerObj = [
    { name: "Home", component: Home },
    { name: "About", component: About },
    { name: "StateFuncVsClass", component: StateFuncVsClass },
    { name: "UseEffect", component: UseEffect },
    { name: "FunVsClass", component: FunVsClass },
    { name: "ClosureTrap", component: ClosureTrap },
    { name: "DidMountState", component: DidMountState },
    { name: "EffectCase", component: EffectCase },
    { name: "Context", component: Context },
    { name: "ContextDemo1", component: ContextDemo1 },
  ];
  return (
    <div className="container">
      <ul className="leftBar">
        {routerObj.map((item) => (
          <li key={item.name}>
            <NavLink
              to={`/${item.name.toLowerCase()}`}
              className={({ isActive }) =>
                isActive ? "focusItem" : "focusItem"
              }
            >
              {item.name}
            </NavLink>
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
