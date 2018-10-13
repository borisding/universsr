import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import { ENV, DEV, SYSPATH } from '@config';
import { proxy, logger, errorHandler } from '@middlewares/express';

const app = express();
const views = [`${SYSPATH['PUBLIC']}/views`, `${SYSPATH['RESOURCES']}/views`];

app
  .set('etag', !DEV)
  .set('view engine', 'ejs')
  .set('views', views);

app
  .use(logger.http())
  .use(helmet())
  .use(compression())
  .use(express.static(SYSPATH['PUBLIC']))
  .use(`/api/${ENV['API_VERSION']}`, proxy.proxyWeb);

if (DEV) {
  require('@build/webpack/compiler')(app);
} else {
  const clientStats = require('@public/stats.json');
  const serverRenderer = require('@app/renderer-built').default;

  app.use(favicon(`${SYSPATH['PUBLIC']}/icons/favicon.png`));
  app.use(serverRenderer({ clientStats }));
}

// mount error handler middleware last
app.use(errorHandler());

export default app;
