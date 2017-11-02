import React from 'react';
import flushChunks from 'webpack-flush-chunks';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import { flushChunkNames } from 'react-universal-component/server';

import serialize from 'serialize-javascript';
import storeFactory from '@redux/store';
import routes from '@client/routes';
import App from '@client/App';

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
export default function serverRenderer({ clientStats }) {
  return async (req, res, next) => {
    try {
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

      const chunkNames = flushChunkNames();
      const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });
      const { statusCode, redirectUrl } = context;

      if ([301, 302].includes(statusCode)) {
        return res.redirect(statusCode, redirectUrl);
      }

      res.status(statusCode || 200).render('index', {
        appString,
        preloadedStateScript,
        cssHash,
        styles,
        js
      });
    } catch (err) {
      next(err);
    }
  };
}
