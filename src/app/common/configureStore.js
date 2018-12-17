import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
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

  // check if redux devtools extension compose available
  // apply for development environment only
  const withReduxDevtools =
    DEV &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  // make compose enhancers
  const composeEnhancers = withReduxDevtools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        /* specify extension’s options, if any */
      })
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, preloadedState, enhancer);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const { nextRootReducer } = require('./rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
