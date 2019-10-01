import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import configureStore from "./store";
import initReactFastclick from "react-fastclick";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/styles.css";
import "./lib/favicon";

import App from "./routes";

if ("ontouchstart" in document.documentElement) {
  document.body.style.cursor = "pointer";
}

initReactFastclick();

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
