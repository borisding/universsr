const isDev = require('isdev');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const config = require('@config');
const syspath = require('@config/syspath');
const { error, info } = require('@utils');
const { csp, proxy } = require('./middlewares');
const run = require('./run');

const { secret, publicPath, apiVersion } = config.getProperties();
const app = express();

app
  .set('etag', !isDev)
  .set('view engine', 'ejs')
  .use(helmet())
  .use(csp.nonce())
  .use(csp.mount(helmet))
  .use(compression())
  .use(cookieParser(secret))
  .use(publicPath, express.static(syspath.public))
  .use(`/api/${apiVersion}`, proxy.proxyWeb);

run(app);
