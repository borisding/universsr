import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import webpackConfig from '../webpack.config.babel';

export default function webpackCompiler(callback = () => {}) {
  const clientConfig = webpackConfig[0] || {};
  const serverConfig = webpackConfig[1] || {};
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers.find(
    compiler => compiler.name === 'client'
  );

  const webpackDevInstance = webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: clientConfig.output.publicPath,
    writeToDisk: filePath => /loadable-stats\.json$/.test(filePath)
  });

  // invoked callback once compiled bundle is valid
  webpackDevInstance.waitUntilValid(callback);

  return [
    // mount webpack dev middleware
    webpackDevInstance,
    // mount webpack hot reloading middleware
    webpackHotMiddleware(clientCompiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10000
    }),
    // server hot updates must be placed after client hot reload
    webpackHotServerMiddleware(compiler)
  ];
}
