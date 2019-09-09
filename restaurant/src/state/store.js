import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import * as reducers from './ducks'

export default function configureStore(initialState) {
  const rootReducer = combineReducers(reducers)
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(rootReducer, initialState, composeEnhancers())
  return store
}
/* eslint-enable */
