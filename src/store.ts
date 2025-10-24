// import { combineReducers, legacy_createStore as createStore } from "redux";
// import { authReducers } from "./redux/reducer/authReducer";
// import { notificationReducers } from "./redux/reducer/notificationReducer";
// import { devToolsEnhancer } from "redux-devtools-extension";

// const rootReducer = combineReducers({
//   auth: authReducers,
//   datas: notificationReducers,
// });
// const store = createStore(rootReducer, devToolsEnhancer({}) as any);
// export default store;
// =============================
import { combineReducers, legacy_createStore as createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { authReducers } from "./redux/reducer/authReducer";
// import { notificationReducers } from "./redux/reducer/natificationReducer";
import { notificationReducers } from "./redux/reducer/notificationReducer";

const rootReducer = combineReducers({
  auth: authReducers,
  datas: notificationReducers,
});

const store = createStore(rootReducer, devToolsEnhancer({}) as any);

export default store;
