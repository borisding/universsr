import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import { hydrate } from 'react-dom';
import { isDev } from '@config';
import configureStore from '@redux/configureStore';
import registerOffline from './offline';
import routes from './routes';

const history = createBrowserHistory();
const preloadedState = window.__UNIVERSSR_PRELOADED_STATE__;
const store = configureStore(history, preloadedState);

const render = routes => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(routes);

if (!isDev) {
  registerOffline();
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(routes);
  });
}
