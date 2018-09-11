import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import App from './app'
import Home from './home'
import Page from './page'
import Media from './media'
import PageNotFound from './not-found'

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Main_page" render={() => <Redirect to="/" />} />
      <Route path="/File::title" component={Media} />
      <Route path="/:title" component={Page} />
      <Route component={PageNotFound} />
    </Switch>
  </App>
)
