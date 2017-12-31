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
function prefetchBranchData(store, pathname) {
  try {
    const branch = matchRoutes(routes, pathname);
    const promises = branch.map(({ route, match }) => {
      return match && match.isExact && route && route.loadData
        ? store.dispatch(route.loadData(match))
        : Promise.resolve(null);
    });

    return Promise.all(promises);
  } catch (err) {
    throw new Error(err);
  }
}

// export default server renderer and receiving stats
// also, should allow it to be mounted as middleware for production usage
export default function serverRenderer({ clientStats }) {
  return (req, res, next) => {
    try {
      const initial = {};
      const context = initial;
      const nonce = res.locals.nonce;
      const store = storeFactory(initial);

      prefetchBranchData(store, req.url).then(() => {
        const appString = renderToString(
          <App store={store} location={req.url} context={context} />
        );

        const pageTitle = DocumentTitle.rewind();
        const { scripts, styles, cssHashRaw } = flushChunks(clientStats, {
          chunkNames: flushChunkNames()
        });

        const preloadedState = serialize(store.getState(), { isJSON: true });
        const cssChunks = serialize(cssHashRaw, { isJSON: true });
        const { statusCode, redirectUrl } = context;

        if ([301, 302].includes(statusCode) && redirectUrl) {
          return res.redirect(statusCode, redirectUrl);
        }

        res.status(statusCode || 200).render('index', {
          pageTitle,
          appString,
          preloadedState,
          cssChunks,
          scripts,
          styles,
          nonce
        });
      });
    } catch (err) {
      internalServer(err, req, res, next);
    }
  };
}

// caught internal server error handling
function internalServer(err, req, res, next) {
  if (!isDev) {
    return res
      .status(500)
      .send('<h3>Sorry! Something went wrong. Please come back later.</h3>');
  }

  return next(err);
}
