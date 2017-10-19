import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import appPath from '@config/app-path';
import store from '@redux/store';
import App from '@client/App';

// export default server renderer
// also, should allow it to be mounted as middleware for production usage
// TODO: initial state handling, etc
function serverRenderer(options) {
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return (req, res, next) => {
    res.render('index', {
      content
    });
  };
}

export default serverRenderer;
