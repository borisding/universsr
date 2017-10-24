import isDev from 'isdev';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import readyWrapper from 'redux-ready-wrapper';
import rootReducer from './root';

function storeFactory(preloadedState) {
  const middlewares = [readyWrapper()];

  if (isDev) {
    middlewares.push(
      createLogger({
        duration: true
      })
    );
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  if (module.hot) {
    module.hot.accept('./root', () => {
      const nextRootReducer = require('./root').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default storeFactory;
