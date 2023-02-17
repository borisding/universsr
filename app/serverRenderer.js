import { HelmetProvider } from 'react-helmet-async';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { createFrontloadState, frontloadServerRender } from 'react-frontload';
import { minify } from 'html-minifier';
import { StaticRouter } from 'react-router-dom/server';
import serialize from 'serialize-javascript';
import path from 'path';

import App from './App';
import html from './static/html';
import * as services from './services';
import { env, paths } from '../utils';
import { StaticRouterProvider } from './context';

function createHtmlPageContent(data) {
  if (env.isDev) {
    return html(data);
  }

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

export default function serverRenderer() {
  return async (req, res, next) => {
    try {
      const staticContext = {};
      const helmetContext = {};
      const statsFile = path.resolve(`${paths.build}/loadable-stats.json`);
      const extractor = new ChunkExtractor({ statsFile });

      const frontloadState = createFrontloadState.server({
        context: { api: services }
      });

      const { rendered, data } = await frontloadServerRender({
        frontloadState,
        render() {
          return renderToString(
            extractor.collectChunks(
              <StaticRouter location={req.url}>
                <StaticRouterProvider context={staticContext}>
                  <HelmetProvider context={helmetContext}>
                    <App frontloadState={frontloadState} />
                  </HelmetProvider>
                </StaticRouterProvider>
              </StaticRouter>
            )
          );
        }
      });

      const scripts = extractor.getScriptTags();
      const styles = extractor.getStyleTags();
      const frontloadData = serialize(data, { isJSON: true });
      const { helmet } = helmetContext;
      const { statusCode = 200 } = staticContext;

      res.status(statusCode).send(
        createHtmlPageContent({
          helmet,
          styles,
          scripts,
          rendered,
          frontloadData
        })
      );
    } catch (err) {
      next(new Error(err));
    }
  };
}
