import isDev from 'isdev';
import React from 'react';
import DocumentTitle from 'react-document-title';
import serialize from 'serialize-javascript';
import flushChunks from 'webpack-flush-chunks';
import { flushChunkNames } from 'react-universal-component/server';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import storeFactory from '@redux/store';
import routes from '@client/routes';
import App from '@client/App';

// preload data for matched route
function prefetchBranchData(store, url) {
  try {
    const branch = matchRoutes(routes, url);
    const promises = branch.map(({ route, match }) => {
      const data =
        match && match.isExact && route && route.loadData
          ? store.dispatch(route.loadData(match))
          : null;

      return Promise.resolve(data);
    });

    return Promise.all(promises);
  } catch (err) {
    throw new Error(err);
  }
}

// export default server renderer and receiving stats
// also, should allow it to be mounted as middleware for production usage
export default function serverRenderer({ clientStats }) {
  return async (req, res, next) => {
    try {
      const context = {};
      const store = storeFactory({});
      const nonce = res.locals.nonce;

      await prefetchBranchData(store, req.url);

      const appString = renderToString(
        <App store={store} location={req.url} context={context} />
      );

      const { scripts, styles, cssHashRaw } = flushChunks(clientStats, {
        chunkNames: flushChunkNames()
      });

      const pageTitle = DocumentTitle.rewind();
      const preloadedState = serialize(store.getState(), { isJSON: true });
      const cssChunks = serialize(cssHashRaw, { isJSON: true });
      const { statusCode = 200, redirectUrl } = context;

      if ([301, 302].includes(statusCode) && redirectUrl) {
        return res.redirect(statusCode, redirectUrl);
      }

      res.status(statusCode).render('index', {
        pageTitle,
        appString,
        preloadedState,
        cssChunks,
        scripts,
        styles,
        nonce
      });
    } catch (err) {
      internalServer(err, req, res, next);
    }
  };
}

// caught internal server error handling
function internalServer(err, req, res, next) {
  if (!isDev) {
    return res.status(500).send('<h3>Sorry! Something went wrong.</h3>');
  }

  return next(err);
}
