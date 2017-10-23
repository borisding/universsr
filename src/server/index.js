import fs from 'fs';
import isDev from 'isdev';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import routes from '@client/routes';
import syspath from '@config/syspath';
import storeFactory from '@redux/store';

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
function prefetchBranchData(pathname) {
  const branch = matchRoutes(routes, pathname);
  const promises = branch.map(({ route, match }) => {
    return route.component.loadData
      ? route.component.loadData(match)
      : Promise.resolve(null);
  });

  return Promise.all(promises);
}

// export default server renderer
// also, should allow it to be mounted as middleware for production usage
export default function serverRenderer() {
  return (req, res, next) => {
    try {
      const { css, js } = getAssets();
      const store = storeFactory({});
      const context = {};

      // proceed to rendering once prefetched data is ready in store
      prefetchBranchData(req.url).then(() => {
        const preloadedStateScript = `
        <script>
          window.__PRELOADED_STATE__ = ${serialize(store.getState(), {
            isJSON: true
          })}
        </script>
      `;

        const content = renderToString(
          <Provider store={store} key="provider">
            <StaticRouter location={req.url} context={context}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        );

        const { statusCode, redirectUrl } = context;

        if ([301, 302].includes(statusCode)) {
          return res.redirect(statusCode, redirectUrl);
        }

        res.status(statusCode || 200).render('index', {
          css,
          js,
          content,
          preloadedStateScript
        });
      });
    } catch (err) {
      next(err);
    }
  };
}
