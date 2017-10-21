import fs from 'fs';
import isDev from 'isdev';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import routes from '@client/routes';
import syspath from '@config/syspath';
import storeFactory from '@redux/store';
import todos from '@fixtures/todos';

// TODO: improve assets handling
const getAssets = () => {
  // leave css property as empty for development mode
  // as extract css is disabled to allow hot reload
  if (isDev) {
    return {
      css: '',
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
};

// export default server renderer
// also, should allow it to be mounted as middleware for production usage
// TODO: prefetch data, etc
const serverRenderer = options => (req, res) => {
  const { css, js } = getAssets();
  const context = {};

  const store = storeFactory({ todos });
  const preloadedStateScript = `
  <script>
    window.__PRELOADED_STATE__ = ${serialize(store.getState(), {
      isJSON: true
    })}
  </script>
`;

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );

  res.render('index', {
    css,
    js,
    content,
    preloadedStateScript
  });
};

export default serverRenderer;
