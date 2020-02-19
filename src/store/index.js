import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import settings from './settings'
import tabs from './tabs'

const initialState = {}

export default () =>
  createStore(
    combineReducers({
      settings,
      tabs
    }),
    initialState,
    applyMiddleware(thunk, createLogger)
  )
