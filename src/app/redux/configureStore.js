import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { isDev } from '@config';
import { serviceAlert } from './middlewares';
import { requestActions } from './ducks/request';
import rootReducer from './ducks';

export default function configureStore(preloadedState = {}) {
  const middlewares = [
    // register request actions for dispatch
    // so that it's accessible in respective thunk wrappers
    thunk.withExtraArgument({ ...requestActions }),
    serviceAlert()
  ];

  // check if redux devtools extension compose available
  // apply for development environment only
  const withReduxDevtools =
    isDev &&
    typeof window !== 'undefined' &&
    window.__REDUX_isDevTOOLS_EXTENSION_COMPOSE__;

  // make compose enhancers
  const composeEnhancers = withReduxDevtools
    ? window.__REDUX_isDevTOOLS_EXTENSION_COMPOSE__({
        /* specify extension’s options, if any */
      })
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, preloadedState, enhancer);

  if (module.hot) {
    module.hot.accept('./ducks', () => {
      const { nextRootReducer } = require('./ducks');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
