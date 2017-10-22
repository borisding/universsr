import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { hydrate } from 'react-dom';
import storeFactory from '@redux/store';
import routes from './routes';

const preloadedState = window.__PRELOADED_STATE__;
const store = storeFactory(preloadedState);

const render = () => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept(() => render());
}

render();
