import React from "react";
import universal from "react-universal-component";
import { hot } from "react-hot-loader";
import "./app.css";

import Header from "./components/header";
import { Router } from "react-static";
import Routes from "react-static-routes";

const App = () => (
  <Router>
    <div>
      <Header />
      <main className="content">
        <Routes />
      </main>
    </div>
  </Router>
);

export default hot(module)(App);
