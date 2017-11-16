const isDev = require('isdev');
const favicon = require('serve-favicon');
const serve = require('../../bin/serve');
const syspath = require('../../config/syspath');
const { error } = require('../utils');

module.exports = async function run(app) {
  try {
    if (isDev) {
      const errorHandler = require('errorhandler');
      const webpackCompiler = require(`${syspath.root}/build/webpack-compiler`);

      await webpackCompiler(app);

      app.set('views', `${syspath.resources}/views`);
      app.use(errorHandler());
    } else {
      const clientStats = require(`${syspath.public}/dist/stats.json`);
      const serverRenderer = require('./index-built').default;

      app.set('views', `${syspath.public}/dist`);
      app.use(favicon(`${syspath.public}/dist/icons/favicon.png`));
      app.use(serverRenderer({ clientStats }));
    }

    serve(app);
  } catch (err) {
    error(err.stack, -1);
  }
};