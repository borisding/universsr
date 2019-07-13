import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { isDev, isNode } from '@config';
import { serviceAlert } from './middleware';
import { requestActions } from './modules/request';
import createRootReducer from './modules';

export default function configureStore(preloadedState) {
  const { url, ...intialState } = preloadedState;
  const history = isNode
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const middleware = [
    routerMiddleware(history),
    // register request actions for dispatch
    // so that it's accessible in respective thunk wrappers
    thunk.withExtraArgument({ ...requestActions }),
    serviceAlert()
  ];

  // check if redux devtools extension compose available
  // apply for development environment only
  const withReduxDevtools =
    isDev && !isNode && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  // make compose enhancers
  const composeEnhancers = withReduxDevtools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        /* specify extension’s options, if any */
      })
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(createRootReducer(history), intialState, enhancer);

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const { nextRootReducer } = require('./modules').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, history };
}
