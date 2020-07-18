import { combineReducers, createStore, applyMiddleware } from 'redux'
import { getLocalStorageItem, setLocalStorageItem } from '../lib/localStorage'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import pages from './pages'
import settings from './settings'
import tabs from './tabs'

const initialState = getLocalStorageItem('wikipadia-state')

export default () => {
  const store = createStore(
    combineReducers({
      pages,
      settings,
      tabs
    }),
    initialState,
    applyMiddleware(thunk, createLogger)
  )

  store.subscribe(() => {
    const { tabs } = store.getState()
    setLocalStorageItem('wikipadia-state', { tabs })
  })

  return store
}
