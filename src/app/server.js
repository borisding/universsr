import 'make-promises-safe';
import express from 'express';
import isDev from 'isdev';
import http from 'http';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import syspath from '@config/syspath';
import { secretKey, apiVersion, port } from '@config/properties';
import { csp, proxy, logger } from '@middlewares/express';
import { print } from '@utils';

const app = express();

app
  .set('etag', !isDev)
  .set('view engine', 'ejs')
  .use(logger())
  .use(helmet())
  .use(csp.nonce())
  .use(csp.mount(helmet))
  .use(compression())
  .use(cookieParser(secretKey))
  .use(express.static(syspath.public))
  .use(`/api/${apiVersion}`, proxy.proxyWeb);

if (isDev) {
  const errorHandler = require('errorhandler');
  const webpackCompiler = require('@build/webpack/compiler');

  webpackCompiler(app);

  app.set('views', `${syspath.resources}/views`);
  app.use(errorHandler());
} else {
  const clientStats = require('@public/stats.json');
  const serverRenderer = require('@app/renderer-built').default;

  app.set('views', syspath.public);
  app.use(favicon(`${syspath.public}/icons/favicon.png`));
  app.use(serverRenderer({ clientStats }));
}

const server = http.createServer(app);

server.listen(port || 5000);
server.on('listening', () => {
  const address = server.address();

  print.info('App Server is up! Listening: %s', 0, [
    'port' in address ? address.port : address
  ]);
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      print.error('Not enough privileges to run app server.', -1);
      break;
    case 'EADDRINUSE':
      print.error('%s is already in use.', -1, [port]);
      break;
    default:
      throw err;
  }
});

export default app;
