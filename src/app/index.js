import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import config, { DEV, SYSPATH } from '@config';
import { csp, proxy, logger, errorHandler } from '@middlewares/express';

const app = express();

app
  .set('etag', !DEV)
  .set('view engine', 'ejs')
  .set('views', [`${SYSPATH['public']}/views`, `${SYSPATH['resources']}/views`])
  .use(logger.http())
  .use(helmet())
  .use(csp.nonce())
  .use(csp.mount(helmet))
  .use(compression())
  .use(express.static(SYSPATH['public']))
  .use(`/api/${config['API_VERSION']}`, proxy.proxyWeb);

if (DEV) {
  require('@build/webpack/compiler')(app);
} else {
  const clientStats = require('@public/stats.json');
  const serverRenderer = require('@app/renderer-built').default;

  app.use(favicon(`${SYSPATH['public']}/icons/favicon.png`));
  app.use(serverRenderer({ clientStats }));
}

// mount error handler middleware last
app.use(errorHandler());

export default app;
