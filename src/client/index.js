import 'babel-polyfill';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from '@client/App';
import store from '@redux/store';

const init = () => {
  hydrate(
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept(() => init());
}

init();
