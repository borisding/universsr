import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { hydrate } from 'react-dom';
import routes from '@config/routes';
import configStore from '@redux/store';

const preloadedState = window.__PRELOADED_STATE__;
const store = configStore(preloadedState);

const render = () => {
  hydrate(
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept(() => render());
}

render();
