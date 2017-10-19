const express = require('express');
const path = require('path');
const isDev = require('isdev');
const hpp = require('hpp');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRouter = require('../api/router');
const config = require('../../config/index');
const syspath = require('../../config/syspath');
const webpackHandlers = require('../../build/webpack-handlers');
const boot = require('./boot');

const app = express();

app
  .set('json spaces', 2)
  .set('view engine', 'ejs')
  .set('views', `${syspath.src}/assets/views`);

app
  .use(helmet())
  .use(express.static(syspath.public))
  .use(cookieParser(config.get('secret')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp()); // right after parsed body

app.use('/api', apiRouter);

// webpack compiler & both client and server hot reload for development
if (isDev) {
  webpackHandlers(app);
} else {
  // using server renderer directly instead for production
  const serverRenderer = require('./index-built').default;

  app.use(favicon(`${syspath.public}/dist/icons/favicon.ico`));
  app.use(serverRenderer());
}

boot(app);
