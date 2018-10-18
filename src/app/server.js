import React from 'react';
import DocumentTitle from 'react-document-title';
import serialize from 'serialize-javascript';
import flushChunks from 'webpack-flush-chunks';
import { renderToString } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServiceClass } from '@utils';
import configureStore from './configureStore';
import routes from './routes';

// preload data for matched route
function prefetchBranchData(store, req) {
  try {
    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({ route, match }) => {
      const { loadData } = route;
      const { dispatch } = store;

      if (match && match.isExact && loadData) {
        if (Array.isArray(loadData)) {
          return Promise.all(
            loadData.map(action => dispatch(action(match, req)))
          );
        } else {
          return dispatch(loadData(match, req));
        }
      }

      return Promise.resolve(null);
    });

    return Promise.all(promises);
  } catch (err) {
    throw err;
  }
}

// export default server renderer and receiving stats
// also, should allow it to be mounted as middleware for production usage
export default function serverRenderer({ clientStats }) {
  return async (req, res, next) => {
    try {
      // assign request object to service class via setter method
      // so that we can add cookie header in service later for server
      if (req && req.cookies) {
        ServiceClass.req = req;
      }

      const context = {};
      const store = configureStore();
      await prefetchBranchData(store, req);

      const appString = renderToString(
        <Provider store={store}>
          <Router location={req.url} context={context}>
            {renderRoutes(routes)}
          </Router>
        </Provider>
      );

      const pageTitle = DocumentTitle.rewind();
      const chunksOptions = { chunkNames: flushChunkNames() };
      const { js, styles } = flushChunks(clientStats, chunksOptions);
      const preloadedState = serialize(store.getState(), { isJSON: true });
      const { statusCode = 200, redirectUrl } = context;

      // make page redirection when expected `statusCode` and `redirectUrl`
      // props are provided in `HttpStatus` component
      if ([301, 302].includes(statusCode) && redirectUrl) {
        return res.redirect(statusCode, redirectUrl);
      }

      return res.status(statusCode).render('index', {
        pageTitle,
        appString,
        preloadedState,
        styles,
        js
      });
    } catch (err) {
      next(new Error(err));
    }
  };
}
