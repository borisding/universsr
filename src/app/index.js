import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import config, { DEV, SYSPATH } from '@config';
import { csp, proxy, logger } from '@middlewares/express';

const app = express();

app
  .set('etag', !DEV)
  .set('view engine', 'ejs')
  .use(logger())
  .use(helmet())
  .use(csp.nonce())
  .use(csp.mount(helmet))
  .use(compression())
  .use(express.static(SYSPATH['public']))
  .use(`/api/${config['API_VERSION']}`, proxy.proxyWeb);

if (DEV) {
  const errorHandler = require('errorhandler');
  const webpackCompiler = require('@build/webpack/compiler');

  webpackCompiler(app);

  app.set('views', `${SYSPATH['resources']}/views`);
  app.use(errorHandler());
} else {
  const clientStats = require('@public/stats.json');
  const serverRenderer = require('@app/renderer-built').default;

  app.set('views', SYSPATH['public']);
  app.use(favicon(`${SYSPATH['public']}/icons/favicon.png`));
  app.use(serverRenderer({ clientStats }));
}

export default app;
