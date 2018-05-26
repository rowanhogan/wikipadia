import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Page from "./Page";
import Media from "./Media";

const PageNotFound = () => <div>😢 Not Found</div>;

export default () => (
  <div>
    <header className="header">
      <Link to="/">Wikipadia</Link>
    </header>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/File::title" component={Media} />
      <Route path="/:title" component={Page} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);
