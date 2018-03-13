import isDev from 'isdev';
import React from 'react';
import DocumentTitle from 'react-document-title';
import serialize from 'serialize-javascript';
import flushChunks from 'webpack-flush-chunks';
import { renderToString } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import storeFactory from '@app/store';
import routes from '@app/routes';

// preload data for matched route
function prefetchBranchData(store, url) {
  try {
    const branch = matchRoutes(routes, url);
    const promises = branch.map(({ route, match }) => {
      const { loadData } = route;
      const { dispatch } = store;

      if (match && match.isExact && loadData) {
        return Array.isArray(loadData)
          ? Promise.all(loadData.map(action => dispatch(action(match))))
          : dispatch(loadData(match));
      }

      return Promise.resolve(null);
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
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );

      const pageTitle = DocumentTitle.rewind();
      const { scripts, styles, cssHashRaw } = flushChunks(clientStats, {
        chunkNames: flushChunkNames()
      });

      const preloadedState = serialize(store.getState(), { isJSON: true });
      const cssChunks = serialize(cssHashRaw, { isJSON: true });
      const { statusCode = 200, redirectUrl } = context;

      if ([301, 302].includes(statusCode) && redirectUrl) {
        return res.redirect(statusCode, redirectUrl);
      }

      return res.status(statusCode).render('index', {
        pageTitle,
        appString,
        preloadedState,
        cssChunks,
        scripts,
        styles,
        nonce
      });
    } catch (err) {
      if (!isDev) {
        return res.status(500).send('<h3>Sorry! Something went wrong.</h3>');
      }

      return next(err);
    }
  };
}
