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
const webpackCompiler = require('../../build/webpack-compiler');
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

const compiler = webpackCompiler(app);

if (isDev) {
  // error handler for development only
  const errorHandler = require('errorhandler');

  app.set('views', `${syspath.src}/resources/views`);
  app.use(errorHandler());
} else {
  compiler.run((err, stats) => {
    if (err) {
      throw new Error(err.stack);
    }

    const clientStats = stats.toJson().children[0];
    const serverRenderer = require('./index-built').default;

    app.set('views', syspath.public);
    app.use(express.static(syspath.public));
    app.use(favicon(`${syspath.public}/dist/icons/favicon.png`));
    app.use(serverRenderer({ clientStats }));
  });
}

boot(app);
