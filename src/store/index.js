import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import settings from './settings'

const initialState = {}

export default () =>
  createStore(
    combineReducers({
      settings
    }),
    initialState,
    applyMiddleware(thunk, createLogger)
  )
