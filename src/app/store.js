import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { DEV } from '@config';
import { errorActionCreator, serviceAlert } from '@middlewares/redux';
import rootReducer from './root';

export default function storeFactory(preloadedState = {}) {
  const middlewares = [
    // register global error action creator for `init` wrapper usage
    thunk.withExtraArgument({ errorActionCreator }),
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
    module.hot.accept('./store', () => {
      const { nextRootReducer } = require('./store');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
