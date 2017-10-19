import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import syspath from '@config/syspath';
import store from '@redux/store';
import App from '@client/App';

function getAssets() {
  if (_DEV_) {
    return {
      css: 'css/screen.css',
      js: 'js/bundle.js'
    };
  }

  // if production, read from built `assets.json` instead
  // which consisted of hashed asset file names
  try {
    const { css, js } = JSON.parse(
      fs.readFileSync(`${syspath.public}/assets.json`)
    ).main;

    return {
      css,
      js
    };
  } catch (err) {
    console.error(err);
  }
}

// export default server renderer
// also, should allow it to be mounted as middleware for production usage
// TODO: initial state handling, etc
function serverRenderer(options) {
  const { css, js } = getAssets();
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return (req, res, next) => {
    res.render('index', {
      css,
      js,
      content
    });
  };
}

export default serverRenderer;
