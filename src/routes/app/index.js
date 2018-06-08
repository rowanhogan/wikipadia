import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Home from "../home";
import Page from "../page";
import Media from "../media";

const PageNotFound = () => (
  <div>
    <span role="img" aria-label="Sad face">
      😢
    </span>
    Not Found
  </div>
);

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
