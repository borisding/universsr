const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRouter = require('../api/router');
const config = require('../../config/index');
const syspath = require('../../config/syspath');
const hmr = require('./hmr');
const boot = require('./boot');

const app = express();

app
  .set('json spaces', 2)
  .set('view engine', 'ejs')
  .set('views', `${syspath.src}/assets/views`);

app
  .use(helmet())
  .use(cookieParser(config.get('secret')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp()) // right after parsed body
  .use('/api', apiRouter);

Promise.resolve()
  .then(() => hmr(app))
  .then(() => boot(app))
  .catch(err => {
    console.error('Failed to boot app!');
    console.error(err.stack);
  });
