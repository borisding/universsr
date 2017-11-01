import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { hydrate } from 'react-dom';
import storeFactory from '@redux/store';
import App from './App';

const preloadedState = window.__PRELOADED_STATE__;
const store = storeFactory(preloadedState);

const render = AppComponent => {
  hydrate(
    <AppContainer>
      <AppComponent store={store} />
    </AppContainer>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./App', () => render(App));
}

render(App);
