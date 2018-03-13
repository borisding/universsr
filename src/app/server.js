import isDev from 'isdev';
import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import syspath from '@config/syspath';
import { secretKey, apiVersion } from '@config/properties';
import { csp, proxy, logger } from '@middlewares/express';
import { print } from '@utils';
import serve from '@bin/serve';

const app = express();

app
  .set('etag', !isDev)
  .set('view engine', 'ejs')
  .use(logger())
  .use(helmet())
  .use(csp.nonce())
  .use(csp.mount(helmet))
  .use(compression())
  .use(cookieParser(secretKey))
  .use(express.static(syspath.public))
  .use(`/api/${apiVersion}`, proxy.proxyWeb);

if (isDev) {
  const errorHandler = require('errorhandler');
  const webpackCompiler = require('@build/webpack/compiler');

  webpackCompiler(app);

  app.set('views', `${syspath.resources}/views`);
  app.use(errorHandler());
} else {
  const clientStats = require('@public/stats.json');
  const serverRenderer = require('@app/renderer-built').default;

  app.set('views', syspath.public);
  app.use(favicon(`${syspath.public}/icons/favicon.png`));
  app.use(serverRenderer({ clientStats }));
}

serve(app);

export default app;
