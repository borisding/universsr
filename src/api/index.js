const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('@config');
const serveApi = require('@bin/serveApi');
const routers = require('./routers');

const { secret, apiVersion } = config.getProperties();
const app = express();

// may add more middlewares based on the context
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(cookieParser(secret))
  .use(`/api/${apiVersion}`, routers);

serveApi(app);

module.exports = app;
