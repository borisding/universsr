import 'make-promises-safe';
import http from 'http';
import express from 'express';
import chalk from 'chalk';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import { isDev, syspath } from '../config';
import { httpLogger, errorHandler } from '../middleware';

const app = express();

// could add more middleware here where applicable
app.use(httpLogger());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());
app.use(compression());
app.use(express.static(syspath.public));
app.get('/favicon.ico', (req, res) => res.status(204));

// use webpack compiler for development
// otherwise, use built server renderer instead
if (isDev) {
  const webpackCompiler = require('../webpack/compiler').default;
  app.use(webpackCompiler(runHttpServer));
} else {
  const serverRenderer = require('./build/serverRenderer').default;
  app.use(serverRenderer());
  app.use(errorHandler());
  runHttpServer();
}

// running app http server
function runHttpServer() {
  const server = http.createServer(app);
  const port = parseInt(process.env.PORT, 10) || 3000;

  server.listen(port);
  server.on('listening', () => {
    console.info(chalk.cyan(`App server is listening PORT: ${port}`));
  });

  server.on('error', err => {
    switch (err.code) {
      case 'EACCES':
        console.error(chalk.red('Not enough privileges to run app server.'));
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(chalk.red(`${port} is already in use.`));
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
