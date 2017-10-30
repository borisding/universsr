import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { hydrate } from 'react-dom';
import storeFactory from '@redux/store';
import App from './App';

const preloadedState = window.__PRELOADED_STATE__;
const store = storeFactory(preloadedState);

const render = AppComponent => {
  hydrate(
    <Provider store={store}>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./App', () => render(App));
}

render(App);
