import isDev from 'isdev';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import syspath from '@config/syspath';
import { secretKey, apiVersion } from '@config/properties';
import { csp, proxy } from './middlewares';
import run from './run';

const app = express();

app
  .set('etag', !isDev)
  .set('view engine', 'ejs')
  .use(helmet())
  .use(csp.nonce())
  .use(csp.mount(helmet))
  .use(compression())
  .use(cookieParser(secretKey))
  .use(express.static(syspath.public))
  .use(`/api/${apiVersion}`, proxy.proxyWeb);

run(app);
