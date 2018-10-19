import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { DEV } from '@config';
import { serviceAlert } from '@middlewares/redux';
import { requestError, requestInfo, requestSuccess } from './actions';
import rootReducer from './rootReducer';

export default function configureStore(preloadedState = {}) {
  const middlewares = [
    // register request actions for dispatch
    // so that it's accessible in respective thunk wrappers
    thunk.withExtraArgument({ requestError, requestInfo, requestSuccess }),
    serviceAlert()
  ];

  if (DEV) {
    middlewares.push(createLogger({ duration: true }));
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
