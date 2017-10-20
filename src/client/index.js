import 'babel-polyfill';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import routes from '@config/routes';
import store from '@redux/store';

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
