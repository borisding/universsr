const isDev = require('isdev');
const express = require('express');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('@config');
const serveApi = require('@bin/serveApi');
const { logger } = require('@server/middlewares');
const routers = require('./routers');

const { secret, apiVersion } = config.getProperties();
const app = express();

// may add more middlewares based on the context
app
  .set('etag', !isDev)
  .set('json spaces', 2)
  .disable('x-powered-by')
  .use(logger())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp()) // after parsed body
  .use(cookieParser(secret))
  .use(`/api/${apiVersion}`, routers);

serveApi(app);

module.exports = app;
