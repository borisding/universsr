const express = require('express');
const path = require('path');
const isDev = require('isdev');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const helmet = require('helmet');
const apiRouter = require('../api/router');
const config = require('../../config/index');
const appPath = require('../../config/app-path');
const webpackHot = require('../../build/webpack-hot');
const boot = require('./boot');

const app = express();

app
  .set('json spaces', 2)
  .set('view engine', 'ejs')
  .set('views', `${appPath.src}/assets/views`);

app
  .use(helmet())
  .use(express.static(appPath.public))
  .use(cookieParser(config.get('secret')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp()); // right after parsed body

app.use('/api', apiRouter);

// webpack hot reload for development
if (isDev) {
  webpackHot(app);
} else {
  const serverRenderer = require('./index-built').default;
  app.use(serverRenderer());
  app.use(favicon(`${appPath.public}/dist/icons/favicon.ico`));
}

boot(app);
