import isDev from 'isdev';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { hydrate } from 'react-dom';
import * as OfflineRuntime from 'offline-plugin/runtime';
import storeFactory from '@redux/store';
import App from './App';

const preloadedState = window.__PRELOADED_STATE__;
const store = storeFactory(preloadedState);

const render = AppComponent => {
  hydrate(
    <AppContainer warnings={false}>
      <AppComponent store={store} />
    </AppContainer>,
    document.getElementById('root')
  );
};

const registerOffline = () => {
  OfflineRuntime.install({
    onInstalled() {
      console.info('Your app is ready for offline support.');
    },
    onUpdateReady() {
      OfflineRuntime.applyUpdate();
    },
    onUpdated() {
      window.location.reload();
    },
    onUpdateFailed() {
      console.log('SW failed to update.');
    }
  });
};

// offline registration for production
if (!isDev) {
  registerOffline();
}

if (module.hot) {
  module.hot.accept('./App', () => render(App));
}

render(App);
