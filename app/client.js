import React from 'react';
import { Provider } from 'react-redux';
import { Frontload } from 'react-frontload';
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
      <Frontload>
        <BrowserRouter>{renderRoutes(AppRoutes)}</BrowserRouter>
      </Frontload>
    </Provider>,
    document.getElementById('root')
  );
};

render(routes);

if (!isDev) {
  registerOffline();
}
