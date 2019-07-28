const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackConfig = require('@root/webpack.config');
const { syspath } = require('@config');

let isServerRunning = false;

module.exports = function webpackCompiler(runServer) {
  const clientConfig = webpackConfig[0] || {};
  const serverConfig = webpackConfig[1] || {};
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers.find(
    compiler => compiler.name === 'client'
  );

  clientCompiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
    if (!isServerRunning) {
      runServer();
      isServerRunning = true;
    }
  });

  return [
    // mount webpack middleware for Express
    webpackDevMiddleware(compiler, {
      publicPath: clientConfig.output.publicPath,
      serverSideRender: true,
      logLevel: 'warn',
      watchOptions: {
        aggregateTimeout: 500,
        ignored: [`${syspath.root}/node_modules`],
        poll: false
      }
    }),
    // mount webpack hot reloading middleware
    webpackHotMiddleware(clientCompiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10000
    }),
    // server hot updates must be placed after client hot reload
    webpackHotServerMiddleware(compiler)
  ];
};
