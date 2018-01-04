const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackClient = require('./client');
const webpackServer = require('./server');

module.exports = function webpackCompiler(app) {
  const compiler = webpack([webpackClient, webpackServer]);
  const clientCompiler = compiler.compilers.find(
    compiler => compiler.name === 'client'
  );

  // mount respective webpack middlewares for Express
  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent',
      hot: true,
      serverSideRender: true,
      publicPath: webpackClient.output.publicPath,
      watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/,
        poll: false
      }
    })
  );

  app.use(
    webpackHotMiddleware(clientCompiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10000
    })
  );

  // server hot updates must be placed after client hot reload
  app.use(webpackHotServerMiddleware(compiler));
};
