import { createStore, applyMiddleware } from "redux";

// function M1(store) {
//   return function (next) {
//     return function (action) {
//       console.log("A middleware1 开始");
//       next(action);
//       console.log("B middleware1 结束");
//     };
//   };
// }

// function M2(store) {
//   return function (next) {
//     return function (action) {
//       console.log("C middleware2 开始");
//       next(action);
//       console.log("D middleware2 结束");
//     };
//   };
// }

// function M3(store) {
//   return function (next) {
//     return function (action) {
//       console.log("E middleware3 开始");
//       next(action);
//       console.log("F middleware3 结束");
//     };
//   };
// }

// function reducer(state, action) {
//   if (action.type === "MIDDLEWARE_TEST") {
//     console.log("======= G =======");
//   }
//   return {};
// }

// var store = createStore(reducer, applyMiddleware(M1, M2, M3));

// store.dispatch({ type: "MIDDLEWARE_TEST" });

function reducer(state = { name: "qly" }, action) {
  if (action.type === "Use_Redux") {
    console.log("======= G =======");
    return { name: "ling" };
  }
  return { name: "yuan" };
}

let store = createStore(reducer);

// function dispatchAndLog(store, action) {
//   console.log("dispatching", action);
//   const result = store.dispatch(action);
//   console.log("next state", store.getState());
//   console.log(result);
// }
// dispatchAndLog(store, { type: "Use_Redux" });

const next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  return result;
};
store.dispatch({ type: "Use_Redux" });

function patchStoreToAddLogging(store) {
  const next = store.dispatch;
  store.dispatch = function dispatchAndLog(action) {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
  };
}

function patchStoreToAddCrashReporting(store) {
  const next = store.dispatch;
  store.dispatch = function dispatchAndReportErrors(action) {
    try {
      return next(action);
    } catch (err) {
      console.error("Caught an exception!", err);
    }
  };
}

// function logger(store) {
//   const next = store.dispatch;
//   return function dispatchAndLog(action) {
//     console.log("dispatching", action);
//     const result = next(action);
//     console.log("next state", store.getState());
//     return result;
//   };
// }

function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log("dispatching", action);
      const result = next(action);
      console.log("next state", store.getState());
      return result;
    };
  };
}

function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();
  middlewares.forEach((middleware) => (store.dispatch = middleware(store)));
}
applyMiddlewareByMonkeypatching(store, [logger]);
