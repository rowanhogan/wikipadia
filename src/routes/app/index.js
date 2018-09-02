import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Home from '../home'
import Page from '../page'
import Media from '../media'
import Header from '../../components/header'

const PageNotFound = () => (
  <div>
    <span role="img" aria-label="Sad face">
      😢
    </span>
    Not Found
  </div>
)

export default () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Main_page" render={() => <Redirect to="/" />} />
      <Route path="/File::title" component={Media} />
      <Route path="/:title" component={Page} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
)
