import React from 'react';
import { Provider } from 'react-redux';
import { Frontload } from 'react-frontload';
import { ConnectedRouter } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';

import configureStore from './redux/configureStore';
import routes from './routes';

const preloadedState = window.__UNIVERSSR_PRELOADED_STATE__;
const { store, history } = configureStore(preloadedState);

loadableReady(() => {
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Frontload>{renderRoutes(routes)}</Frontload>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
});
