import fs from 'fs';
import isDev from 'isdev';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import syspath from '@config/syspath';
import storeFactory from '@redux/store';
import routes from '@client/routes';
import App from '@client/App';

// TODO: improve assets handling
function getAssets() {
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
    throw new Error(err);
  }
}

// prefetching branch data from matched component
async function prefetchBranchData(store, pathname) {
  try {
    const branch = await matchRoutes(routes, pathname);
    const promises = await branch.map(({ route, match }) => {
      if (match && match.isExact && route.component.fetchData) {
        return route.component.fetchData(store, match);
      }

      return Promise.resolve(null);
    });

    return Promise.all(promises);
  } catch (err) {
    throw new Error(err);
  }
}

// export default server renderer
// also, should allow it to be mounted as middleware for production usage
export default function serverRenderer() {
  return async (req, res, next) => {
    try {
      const { css, js } = await getAssets();
      const store = await storeFactory({});
      const context = {};

      await prefetchBranchData(store, req.url);

      const preloadedStateScript = `<script>window.__PRELOADED_STATE__ = ${serialize(
        store.getState(),
        {
          isJSON: true
        }
      )}</script>`;

      const appString = renderToString(
        <App
          store={store}
          isServer={true}
          location={req.url}
          context={context}
        />
      );

      const { statusCode, redirectUrl } = context;

      if ([301, 302].includes(statusCode)) {
        return res.redirect(statusCode, redirectUrl);
      }

      res.status(statusCode || 200).render('index', {
        appString,
        preloadedStateScript,
        css,
        js
      });
    } catch (err) {
      next(err);
    }
  };
}
