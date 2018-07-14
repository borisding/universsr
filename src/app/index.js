import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { hydrate } from 'react-dom';
import { DEV } from '@config';
import storeFactory from './store';
import registerOffline from './offline';
import routes from './routes';

const preloadedState = window.__PRELOADED_STATE__;
const store = storeFactory(preloadedState);

const render = AppRoutes => {
  hydrate(
    <AppContainer warnings={false}>
      <Provider store={store}>
        <BrowserRouter>{renderRoutes(AppRoutes)}</BrowserRouter>
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
    const nextAppRoutes = require('./routes').default;
    render(nextAppRoutes);
  });
}
