import 'make-promises-safe';
import http from 'http';
import express from 'express';
import colors from 'colors';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { isDev, syspath } from '../config';
import { httpLogger, httpProxy, errorHandler } from '../middleware';

const app = express();

app.use(httpLogger());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(express.static(syspath.public));
app.use('/images', express.static(`${syspath.assets}/images`));
app.use(`/api/${process.env.API_VERSION}`, httpProxy());
app.get('/favicon.ico', (req, res) => res.status(204));

// use webpack compiler for development
// otherwise, use built server renderer instead
if (isDev) {
  const webpackCompiler = require('../webpack/compiler').default;
  app.use(webpackCompiler(runHttpServer));
} else {
  const clientStats = require('../public/stats');
  const serverRenderer = require('./build/serverRenderer').default;
  app.use(serverRenderer({ clientStats }));
  app.use(errorHandler());
  runHttpServer();
}

// running app http server
function runHttpServer() {
  const server = http.createServer(app);
  const host = process.env.HOST || 'localhost';
  const port = parseInt(process.env.PORT, 10) || 3000;

  server.listen(port, host);
  server.on('listening', () => {
    console.info(colors.cyan(`App server is listening PORT: ${port}`));
  });

  server.on('error', err => {
    switch (err.code) {
      case 'EACCES':
        console.error(colors.red('Not enough privileges to run app server.'));
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(colors.red(`${port} is already in use.`));
        process.exit(1);
        break;
      default:
        throw err;
    }
  });

  ['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(signal => {
    process.on(signal, () => {
      server.close();
      process.exit();
    });
  });
}
