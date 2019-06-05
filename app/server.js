import React from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import flushChunks from 'webpack-flush-chunks';
import { frontloadServerRender } from 'react-frontload';
import { renderToString } from 'react-dom/server';
import { clearChunks, flushChunkNames } from 'react-universal-component/server';
import { renderRoutes } from 'react-router-config';
import { minify } from 'html-minifier';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServiceClass } from '@utils';
import { isDev } from '@config';
import configureStore from '@app/redux/configureStore';
import html from './html';
import routes from './routes';

// creating html page with passed data as content
function createHtmlPage(data) {
  if (isDev) return html(data);

  // minify html for production, programmatically
  return minify(html(data), {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    trimCustomFragments: true
  });
}

// export default server renderer and receiving stats
// also, should allow it to be mounted as middleware for production usage
export default function serverRenderer({ clientStats }) {
  return async (req, res, next) => {
    try {
      clearChunks();

      // assign request object to service class via setter method
      // so that we can add cookie header in service later for server
      if (req && req.cookies) {
        ServiceClass.req = req;
      }

      const context = {};
      const store = configureStore();
      const renderedAppString = await frontloadServerRender(() =>
        renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        )
      );

      // make page redirection when expected `statusCode` and `redirectUrl`
      // props are provided in `HttpStatus` component
      const { statusCode = 200, redirectUrl } = context;

      if ([301, 302].includes(statusCode) && redirectUrl) {
        return res.redirect(statusCode, redirectUrl);
      }

      const helmet = Helmet.renderStatic();
      const preloadedState = serialize(store.getState(), { isJSON: true });
      const { js, styles } = flushChunks(clientStats, {
        chunkNames: flushChunkNames()
      });

      res.status(statusCode).send(
        createHtmlPage({
          styles,
          js,
          renderedAppString,
          preloadedState,
          helmet
        })
      );
    } catch (err) {
      next(new Error(err));
    }
  };
}
