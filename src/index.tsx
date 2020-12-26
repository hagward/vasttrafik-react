import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import "./index.css";

const render = () => {
  const App = require("./app/App").default;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("app-root")
  );
};

render();

const m = module as any;
if (process.env.NODE_ENV === "development" && m.hot) {
  m.hot.accept("./app/App", render);
}
