import React from 'react';
import { Provider } from 'react-redux';
import { Frontload } from 'react-frontload';
import { ConnectedRouter } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';
import { hydrate } from 'react-dom';
import { isDev } from '@config';
import configureStore from './redux/configureStore';
import registerOffline from './offline';
import routes from './routes';

const preloadedState = window.__UNIVERSSR_PRELOADED_STATE__;
const { store, history } = configureStore(preloadedState);

const render = AppRoutes => {
  hydrate(
    <Frontload>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(AppRoutes)}
        </ConnectedRouter>
      </Provider>
    </Frontload>,
    document.getElementById('root')
  );
};

render(routes);

if (!isDev) {
  registerOffline();
}
