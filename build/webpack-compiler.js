const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackClient = require('./webpack-client');
const webpackServer = require('./webpack-server');

// hot reload for development mode
module.exports = app => {
  const compiler = webpack([webpackClient, webpackServer]);
  const clientCompiler = compiler.compilers.find(
    compiler => compiler.name === 'client'
  );

  app.use(
    webpackDevMiddleware(compiler, {
      hot: true,
      noInfo: true,
      serverSideRender: true,
      publicPath: webpackClient.output.publicPath
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
