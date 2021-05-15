import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers'
import sagas from './sagas'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [sagaMiddleware]

export function configureStore(initialState) {
  let store = createStore(
    // reducers,
    persistedReducer,
    initialState,
    // compose(applyMiddleware(...middlewares))
    composeEnhancers(applyMiddleware(...middlewares))
  )

  let persistor = persistStore(store)

  // console.log(store);

  sagaMiddleware.run(sagas)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, persistor }
}
