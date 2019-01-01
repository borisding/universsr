const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackConfig = require('./config');
const { syspath } = require('../../config');

module.exports = function webpackCompiler(app) {
  const clientConfig = webpackConfig[0] || {};
  const serverConfig = webpackConfig[1] || {};
  const compiler = webpack([clientConfig, serverConfig]);

  // mount webpack middlewares for Express
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: clientConfig.output.publicPath,
      serverSideRender: true,
      logLevel: 'warn',
      watchOptions: {
        aggregateTimeout: 500,
        ignored: [
          `${syspath.root}/node_modules`,
          `${syspath.root}/package.json`,
          syspath.bin,
          syspath.resources,
          syspath.storage
        ],
        poll: false
      }
    })
  );

  // mount webpack hot reloading middleware
  app.use(
    webpackHotMiddleware(
      compiler.compilers.find(compiler => compiler.name === 'client'),
      {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10000
      }
    )
  );

  // server hot updates must be placed after client hot reload
  app.use(webpackHotServerMiddleware(compiler));
};
