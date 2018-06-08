import React from "react";
import { Route, Link } from "react-router-dom";

export default () => (
  <div>
    <h1 class="logo">Wikipadia</h1>

    <div class="blurb">
      <p>
        <em>WikiPadia</em> is a beautiful, customisable Wikipedia reader. It was
        specifically built for leisurely reading on an iPad.
      </p>
    </div>
    <Link to="/Main_page">Main Page</Link>
  </div>
);
