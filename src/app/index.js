import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import { DEV, ENV, SYSPATH } from '@config';
import { proxy, logger, errorHandler } from '@middlewares/express';

const app = express();

app
  .set('view engine', 'ejs')
  .set('views', [
    `${SYSPATH['PUBLIC']}/views`,
    `${SYSPATH['RESOURCES']}/views`
  ]);

app
  .use(logger.http())
  .use(helmet())
  .use(compression())
  .use(express.static(SYSPATH['PUBLIC']))
  .use(`/api/${ENV['API_VERSION']}`, proxy.proxyWeb);

// use webpack compiler for development
// otherwise, use built server renderer instead
if (DEV) {
  require('@build/webpack/compiler')(app);
} else {
  const clientStats = require('@public/stats');
  const serverRenderer = require('@build/renderer').default;
  app.use(favicon(`${SYSPATH['PUBLIC']}/icons/favicon.png`));
  app.use(serverRenderer({ clientStats }));
}

// mount error handler middleware last
app.use(errorHandler());

export default app;
