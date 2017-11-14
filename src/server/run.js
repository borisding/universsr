const isDev = require('isdev');
const favicon = require('serve-favicon');
const serve = require('../../bin/serve');
const syspath = require('../../config/syspath');
const { error } = require('../utils');

module.exports = async app => {
  try {
    if (isDev) {
      const errorHandler = require('errorhandler');
      const webpackCompiler = require('../../build/webpack-compiler');

      await webpackCompiler(app);

      app.set('views', `${syspath.public}/views`);
      app.use(errorHandler());
    } else {
      const clientStats = require('../../public/dist/stats.json');
      const serverRenderer = require('./index-built').default;

      app.set('views', `${syspath.public}/dist`);
      app.use(favicon(`${syspath.public}/assets/icons/favicon.png`));
      app.use(serverRenderer({ clientStats }));
    }

    serve(app);
  } catch (err) {
    error(err.stack, -1);
  }
};
