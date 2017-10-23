const express = require('express');
const isDev = require('isdev');
const hpp = require('hpp');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
  .set('view engine', 'ejs')
  .set('views', `${syspath.src}/assets/views`);

app
  //.use(helmet())
  .use(cookieParser(config.get('secret')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp()) // right after parsed body
  .use('/api', apiRouter);

// both client and server hot reload for development
if (isDev) {
  webpackHandlers(app);

  // error handler for development only
  const errorhandler = require('errorhandler');
  app.use(errorhandler());
} else {
  app.use(express.static(syspath.public));
  app.use(favicon(`${syspath.public}/dist/icons/favicon.ico`));

  // using built server renderer instead for production
  const serverRenderer = require('./index-built').default;
  app.use(serverRenderer());
}

boot(app);
