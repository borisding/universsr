import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import webpackConfig from './config.babel';

export default function webpackCompiler(app) {
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
  // workaround to keep entry point name short to avoid
  // `TypeError: serverRenderer is not a function` error
  // @see: https://github.com/faceyspacey/react-universal-component/issues/132#issuecomment-409345250
  app.use(webpackHotServerMiddleware(compiler, { chunkName: 'm' }));
}
