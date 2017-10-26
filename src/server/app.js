const express = require('express');
const isDev = require('isdev');
const hpp = require('hpp');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const apiRouter = require('../api/router');
const config = require('../../config/index');
const syspath = require('../../config/syspath');
const webpackHandlers = require('../../build/webpack-handlers');
const logger = require('./logger');
const boot = require('./boot');

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
  .use('/api', apiRouter);

if (isDev) {
  // both client and server hot reload for development
  webpackHandlers(app);

  app.set('views', `${syspath.src}/resources/views`);

  // error handler for development only
  const errorHandler = require('errorhandler');
  app.use(errorHandler());
} else {
  app.set('views', syspath.public);

  app.use(express.static(syspath.public));
  app.use(favicon(`${syspath.public}/dist/icons/favicon.ico`));

  // using built server renderer instead for production
  const serverRenderer = require('./index-built').default;
  app.use(serverRenderer());
}

boot(app);
