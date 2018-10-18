import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { hydrate } from 'react-dom';
import { DEV } from '@config';
import configureStore from '@common/configureStore';
import registerOffline from './offline';
import routes from './routes';

const preloadedState = window.__UNIVERSSR_PRELOADED_STATE__;
const store = configureStore(preloadedState);

const render = routes => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <Router>{renderRoutes(routes)}</Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(routes);

if (!DEV) {
  registerOffline();
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(routes);
  });
}
