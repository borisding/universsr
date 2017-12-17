import isDev from 'isdev';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import readyWrapper from 'redux-ready-wrapper';
import serviceAlert from '@redux/middlewares/service-alert';
import rootReducer from './root';

export default function storeFactory(preloadedState) {
  const middlewares = [readyWrapper(), serviceAlert()];

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
