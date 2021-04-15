import React from "react";
import { Router } from "react-router-dom";
import { render } from "react-dom";

import { history } from "./_helpers";
import { App } from "./app";
import "antd/dist/antd.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";

const store = createStore(allReducers);

function startApp() {
  render(
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.getElementById("app")
  );
}

startApp();

export default store;
