import 'make-promises-safe';
import colors from 'colors';
import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { isDev, syspath } from '@config';
import { proxy, httpLogger, errorHandler } from '@middleware';

const app = express();

app
  .use(httpLogger())
  .use(helmet())
  .use(cors())
  .use(cookieParser())
  .use(compression())
  .use(express.static(syspath.public))
  .use(`/api/${process.env.API_VERSION}`, proxy.proxyWeb)
  .get('/favicon.ico', (req, res) => res.status(204)); // simply ignore

// use webpack compiler for development
// otherwise, use built server renderer instead
if (isDev) {
  const webpackCompiler = require('@config/webpack/compiler');
  app.use(webpackCompiler(runServer));
} else {
  const clientStats = require('@public/stats');
  const serverRenderer = require('./serverRenderer').default;
  app.use(serverRenderer({ clientStats }));
  runServer();
}

// mount error handler middleware last
app.use(errorHandler());

function runServer() {
  // running app server
  const server = http.createServer(app);
  const serverPort = parseInt(process.env.PORT, 10) || 3000;

  server.listen(serverPort);

  server.on('listening', () => {
    console.info(colors.cyan(`App server is listening PORT: ${serverPort}`));

    if (isDev) {
      console.log(
        colors.green(`App is started at: http://localhost:${serverPort}`)
      );
    }
  });

  server.on('error', err => {
    switch (err.code) {
      case 'EACCES':
        console.error(colors.red('Not enough privileges to run app server.'));
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(colors.red(`${serverPort} is already in use.`));
        process.exit(1);
        break;
      default:
        throw err;
    }
  });

  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit();
      });
    });
  });
}

export default app;
