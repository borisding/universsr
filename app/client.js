import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import { hydrate } from 'react-dom';
import { isDev } from '@config';
import configureStore from '@app/redux/configureStore';
import registerOffline from './offline';
import routes from './routes';

const history = createBrowserHistory();
const preloadedState = window.__UNIVERSSR_PRELOADED_STATE__;
const store = configureStore(history, preloadedState);

const render = AppRoutes => {
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(AppRoutes)}
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

render(routes);

if (!isDev) {
  registerOffline();
}
