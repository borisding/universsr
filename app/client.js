import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { hydrate } from 'react-dom';
import { isDev } from '../config';
import configureStore from './redux/configureStore';
import registerOffline from './offline';
import routes from './routes';

const preloadedState = window.__UNIVERSSR_PRELOADED_STATE__;
const store = configureStore(preloadedState);

const render = AppRoutes => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(AppRoutes)}</BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};

render(routes);

if (!isDev) {
  registerOffline();
}
