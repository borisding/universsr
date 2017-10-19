import fs from 'fs';
import isDev from 'isdev';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import appPath from '@config/app-path';
import store from '@redux/store';
import App from '@client/App';

function getAssets() {
  if (isDev) {
    return {
      style: 'css/screen.css',
      script: 'js/bundle.js'
    };
  }

  // if production, read from built `assets.json` instead
  // which consisted of hashed asset file names
  try {
    const { css, js } = JSON.parse(
      fs.readFileSync(`${appPath.public}/assets.json`)
    ).main;

    return {
      style: css,
      script: js
    };
  } catch (err) {
    console.error(err);
  }
}

// export default server renderer
// also, should allow it to be mounted as middleware for production usage
// TODO: initial state handling, etc
function serverRenderer(options) {
  const assets = getAssets();
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return (req, res, next) => {
    res.render('index', {
      style: assets.style,
      script: assets.script,
      content
    });
  };
}

export default serverRenderer;
