import React from 'react';
import { Helmet } from 'react-helmet';
import { Frontload, frontloadServerRender } from 'react-frontload';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { renderRoutes } from 'react-router-config';
import { minify } from 'html-minifier';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import path from 'path';

import { isDev, syspath } from '../config';
import configureStore from './redux/configureStore';
import html from './html';
import routes from './routes';

// creating html page with passed data as content
function createHtmlPageContent(data) {
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
export default function serverRenderer() {
  return async (req, res, next) => {
    try {
      const statsFile = path.resolve(`${syspath.public}/loadable-stats.json`);
      const extractor = new ChunkExtractor({
        statsFile
      });

      const context = {};
      const { url = '/' } = req;
      const { store } = configureStore({ url });
      const renderedAppString = await frontloadServerRender(() =>
        renderToString(
          <ChunkExtractorManager extractor={extractor}>
            <Provider store={store}>
              <StaticRouter location={url} context={context}>
                <Frontload>{renderRoutes(routes)}</Frontload>
              </StaticRouter>
            </Provider>
          </ChunkExtractorManager>
        )
      );

      const js = extractor.getScriptTags();
      const styles = extractor.getStyleTags();

      const helmet = Helmet.renderStatic();
      const preloadedState = serialize(store.getState(), { isJSON: true });

      // make page redirection when expected `statusCode` and `redirectUrl`
      // props are provided in `HttpStatus` component
      const { statusCode = 200, redirectUrl } = context;
      if ([301, 302].includes(statusCode) && redirectUrl) {
        return res.redirect(statusCode, redirectUrl);
      }

      res.status(statusCode).send(
        createHtmlPageContent({
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
