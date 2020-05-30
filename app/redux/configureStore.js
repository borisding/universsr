import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { isDev, isNode } from '@config';
import createRootReducer from './modules';

export default function configureStore({ url, ...initialState }) {
  const history = isNode
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const middleware = [routerMiddleware(history), thunk];

  // check if redux devtools extension compose available
  // apply for development environment only
  const withReduxDevtools =
    isDev &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  // make compose enhancers
  const composeEnhancers = withReduxDevtools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        /* specify extension’s options, if any */
      })
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  const store = createStore(createRootReducer(history), initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default;
      store.replaceReducer(nextRootReducer(history));
    });
  }

  return { store, history };
}
