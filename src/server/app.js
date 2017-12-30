const isDev = require('isdev');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const syspath = require('@config/syspath');
const { error, info } = require('@utils');
const { secretKey, apiVersion } = require('@config/properties');
const { csp, proxy } = require('./middlewares');
const run = require('./run');

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
