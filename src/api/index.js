const isDev = require('isdev');
const express = require('express');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serveApi = require('@bin/serveApi');
const { secretKey, apiVersion } = require('@config/properties');
const { logger } = require('@server/middlewares');
const routers = require('./routers');

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
  .use(cookieParser(secretKey))
  .use(`/api/${apiVersion}`, routers);

serveApi(app);

module.exports = app;
