import React from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import flushChunks from 'webpack-flush-chunks';
import { renderToString } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { minify } from 'html-minifier';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServiceClass } from '@utils';
import { isDev } from '@config';
import configureStore from '@redux/configureStore';
import createHtml from './html';
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

// creating html page with passed data as content
function renderHtml(data) {
  let html = createHtml(data);

  // minify html for production, programmatically
  if (!isDev) {
    html = minify(html, {
      minifyCSS: true,
      minifyJS: true,
      collapseWhitespace: true,
      removeComments: true,
      trimCustomFragments: true
    });
  }

  return html;
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

      const renderedAppString = renderToString(
        <Provider store={store}>
          <Router location={req.url} context={context}>
            {renderRoutes(routes)}
          </Router>
        </Provider>
      );

      // make page redirection when expected `statusCode` and `redirectUrl`
      // props are provided in `HttpStatus` component
      const { statusCode = 200, redirectUrl } = context;

      if ([301, 302].includes(statusCode) && redirectUrl) {
        res.redirect(statusCode, redirectUrl);
      } else {
        const helmet = Helmet.renderStatic();
        const preloadedState = serialize(store.getState(), { isJSON: true });
        const { js, styles } = flushChunks(clientStats, {
          chunkNames: flushChunkNames()
        });

        res.status(statusCode).send(
          renderHtml({
            styles,
            js,
            renderedAppString,
            preloadedState,
            helmet
          })
        );
      }
    } catch (err) {
      next(new Error(err));
    }
  };
}
