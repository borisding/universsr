import isDev from 'isdev';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import readyWrapper from 'redux-ready-wrapper';
import rootReducer from './root';

const configStore = preloadedState => {
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
    module.hot.accept(() => {
      const nextRootReducer = require('./root').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configStore;
