import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { DEV, NODE } from '@config';
import { serviceAlert } from '@middlewares/redux';
import { requestError, requestInfo, requestSuccess } from './actions';
import rootReducer from './rootReducer';

export default function configureStore(preloadedState = {}) {
  let middlewares = [
    // register request actions for dispatch
    // so that it's accessible in respective thunk wrappers
    thunk.withExtraArgument({ requestError, requestInfo, requestSuccess }),
    serviceAlert()
  ];

  // only applicable for client side in development mode
  if (DEV && !NODE) {
    middlewares = [...middlewares, createLogger({ duration: true })];
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const { nextRootReducer } = require('./rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
