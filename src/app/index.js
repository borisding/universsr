import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { DEV, ENV, SYSPATH } from '@config';
import { proxy, logger, errorHandler } from '@middlewares/express';

const app = express();

app
  .use(logger.http())
  .use(helmet())
  .use(cors())
  .use(cookieParser())
  .use(compression())
  .use(express.static(SYSPATH['PUBLIC']))
  .use(`/api/${ENV['API_VERSION']}`, proxy.proxyWeb)
  .get('/favicon.ico', (req, res) => res.status(204)); // simply ignore

// use webpack compiler for development
// otherwise, use built server renderer instead
if (DEV) {
  require('@build/webpack/compiler')(app);
} else {
  const clientStats = require('@public/stats');
  const serverRenderer = require('@build/serverRenderer').default;
  app.use(serverRenderer({ clientStats }));
}

// mount error handler middleware last
app.use(errorHandler());

export default app;
