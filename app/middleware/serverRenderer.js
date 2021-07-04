import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { createFrontloadState, frontloadServerRender } from 'react-frontload';
import { minify } from 'html-minifier';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import path from 'path';

import { App } from '../components';
import html from '../static/html';
import * as services from '../services';
import { env, paths } from '../../utils';

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
              <StaticRouter location={req.url} context={staticContext}>
                <App frontloadState={frontloadState} />
              </StaticRouter>
            )
          );
        }
      });

      const scripts = extractor.getScriptTags();
      const styles = extractor.getStyleTags();
      const renderedData = serialize(data, { isJSON: true });
      const helmet = Helmet.renderStatic();

      const { statusCode = 200, redirectUrl } = staticContext;
      if ([301, 302].includes(statusCode) && redirectUrl) {
        return res.redirect(statusCode, redirectUrl);
      }

      res.status(statusCode).send(
        createHtmlPageContent({
          helmet,
          styles,
          scripts,
          rendered,
          renderedData
        })
      );
    } catch (err) {
      next(new Error(err));
    }
  };
}
