import 'make-promises-safe';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import compression from 'compression';
import config, { DEV, SYSPATH } from '@config';
import { csp, proxy, logger } from '@middlewares/express';
import { print } from '@utils';

const app = express();

app
  .set('etag', !DEV)
  .set('view engine', 'ejs')
  .use(logger())
  .use(helmet())
  .use(csp.nonce())
  .use(csp.mount(helmet))
  .use(compression())
  .use(express.static(SYSPATH['public']))
  .use(`/api/${config['API_VERSION']}`, proxy.proxyWeb);

if (DEV) {
  const errorHandler = require('errorhandler');
  const webpackCompiler = require('@build/webpack/compiler');

  webpackCompiler(app);

  app.set('views', `${SYSPATH['resources']}/views`);
  app.use(errorHandler());
} else {
  const clientStats = require('@public/stats.json');
  const serverRenderer = require('@app/renderer-built').default;

  app.set('views', SYSPATH['public']);
  app.use(favicon(`${SYSPATH['public']}/icons/favicon.png`));
  app.use(serverRenderer({ clientStats }));
}

const server = http.createServer(app);
const serverPort = process.env.PORT || config['PORT'];

server.listen(serverPort);
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
      print.error('%s is already in use.', -1, [serverPort]);
      break;
    default:
      throw err;
  }
});

export default app;
