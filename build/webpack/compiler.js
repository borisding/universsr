const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackConfig = require('./');

module.exports = function webpackCompiler(app) {
  const clientConfig = webpackConfig[0] || {};
  const serverConfig = webpackConfig[1] || {};
  const compiler = webpack([clientConfig, serverConfig]);

  // mount webpack middlewares for Express
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: clientConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      serverSideRender: true,
      logLevel: 'warn',
      watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/,
        poll: false
      }
    })
  );

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
