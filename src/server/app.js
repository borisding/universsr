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
const appPath = require('../../config/app-path');
const webpackHandlers = require('../../build/webpack-handlers');
const boot = require('./boot');

const app = express();

app
  .set('json spaces', 2)
  .set('view engine', 'ejs')
  .set('views', `${appPath.src}/assets/views`);

app
  .use(express.static(appPath.public))
  .use(helmet())
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

  app
    .use(favicon(`${appPath.public}/dist/icons/favicon.ico`))
    .use(serverRenderer());
}

boot(app);
