import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './middleware/sagas'
import * as reducers from './ducks'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState) {
  const rootReducer = combineReducers(reducers)
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  // run the saga
  sagaMiddleware.run(rootSaga)
  return store
}
/* eslint-enable */
