const isDev = require('isdev');
const favicon = require('serve-favicon');
const serve = require('@bin/serve');
const syspath = require('@config/syspath');
const { error } = require('@utils');

module.exports = async function run(app) {
  try {
    if (isDev) {
      const errorHandler = require('errorhandler');
      const webpackCompiler = require('@build/webpack/compiler');

      await webpackCompiler(app);

      app.set('views', `${syspath.resources}/views`);
      app.use(errorHandler());
    } else {
      const clientStats = require('@public/stats.json');
      const serverRenderer = require('@server/index-built').default;

      app.set('views', syspath.public);
      app.use(favicon(`${syspath.public}/icons/favicon.png`));
      app.use(serverRenderer({ clientStats }));
    }

    serve(app);
  } catch (err) {
    error(err.stack, -1);
  }
};
