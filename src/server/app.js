const express = require('express');
const isDev = require('isdev');
const hpp = require('hpp');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const config = require('@config');
const syspath = require('@config/syspath');
const apiRouter = require('@api/router');
const logger = require('./middlewares/logger');
const csp = require('./middlewares/csp');
const run = require('./run');

const { secret, publicPath, apiVersion } = config.getProperties();
const app = express();

app
  .set('etag', !isDev)
  .set('json spaces', 2)
  .set('view engine', 'ejs');

app
  .use(logger())
  .use(helmet())
  .use(csp.nonce())
  .use(csp.mount(helmet))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(cors())
  .use(compression())
  .use(cookieParser(secret))
  .use(hpp()) // after parsed body
  .use(publicPath, express.static(syspath.public))
  .use(`${publicPath}api/${apiVersion}`, apiRouter);

run(app);
