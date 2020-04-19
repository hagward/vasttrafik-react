import {
  Action,
  configureStore,
  getDefaultMiddleware,
  Middleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";

const localStorageSaver: Middleware = (api) => (next) => (action) => {
  const dispatch = next(action);

  window.localStorage.setItem("state", JSON.stringify(api.getState()));

  return dispatch;
};

const localStorageState = window.localStorage.getItem("state");

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), localStorageSaver],
  preloadedState: localStorageState ? JSON.parse(localStorageState) : undefined,
});

const m = module as any;
if (process.env.NODE_ENV === "development" && m.hot) {
  m.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
