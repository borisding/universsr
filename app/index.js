import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { isDev, syspath } from '@config';
import { proxy, httpLogger, errorHandler } from '@middlewares';

const app = express();

app
  .use(httpLogger())
  .use(helmet())
  .use(cors())
  .use(cookieParser())
  .use(compression())
  .use(express.static(syspath.public))
  .use(`/api/${process.env.API_VERSION}`, proxy.proxyWeb)
  .get('/favicon.ico', (req, res) => res.status(204)); // simply ignore

// use webpack compiler for development
// otherwise, use built server renderer instead
if (isDev) {
  require('@config/webpack/compiler')(app);
} else {
  const clientStats = require('@public/stats');
  const serverRenderer = require('./serverRenderer').default;
  app.use(serverRenderer({ clientStats }));
}

// mount error handler middleware last
app.use(errorHandler());

export default app;
