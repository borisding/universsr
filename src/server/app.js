const express = require('express');
const isDev = require('isdev');
const hpp = require('hpp');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const config = require('../../config/index');
const syspath = require('../../config/syspath');
const apiRouter = require('../api/router');
const logger = require('./logger');
const run = require('./run');

const app = express();

logger(app);

app
  .set('etag', !isDev)
  .set('json spaces', 2)
  .set('view engine', 'ejs');

app
  .use(helmet())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(cors())
  .use(compression())
  .use(cookieParser(config.get('secret')))
  .use(hpp()) // after parsed body
  .use('/', express.static(syspath.public))
  .use('/api', apiRouter);

run(app);
