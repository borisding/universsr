import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import webpackConfig from '../webpack.config.babel';
import { syspath } from '../config';

export default function webpackCompiler(runHttpServer) {
  const clientConfig = webpackConfig[0] || {};
  const serverConfig = webpackConfig[1] || {};
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers.find(
    compiler => compiler.name === 'client'
  );

  const webpackDevInstance = webpackDevMiddleware(compiler, {
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true,
    logLevel: 'warn',
    watchOptions: {
      aggregateTimeout: 500,
      ignored: [`${syspath.root}/node_modules`],
      poll: false
    }
  });

  // only runnig http server once compiled bundle is valid
  webpackDevInstance.waitUntilValid(() => {
    runHttpServer();
  });

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
