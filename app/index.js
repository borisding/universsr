import http from 'http';
import express from 'express';
import colors from 'colors';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { isDev, syspath } from '@config';
import { proxyServer, httpLogger, errorHandler } from '@middleware';

const app = express();

app
  .use(httpLogger())
  .use(helmet())
  .use(cors())
  .use(cookieParser())
  .use(compression())
  .use(express.static(syspath.public))
  .use(`/api/${process.env.API_VERSION}`, proxyServer.proxyWeb)
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

// running app server
function runServer() {
  const server = http.createServer(app);
  const host = process.env.HOST || 'localhost';
  const port = parseInt(process.env.PORT, 10) || 3000;

  server.listen(port, host);

  server.on('listening', () => {
    console.info(colors.cyan(`App server is listening PORT: ${port}`));

    if (isDev) {
      const url = `http://${host}:${port}`;
      console.log(colors.green(`App started at: ${url}`));
      require('open')(url);
    }
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

  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close();
      process.exit();
    });
  });
}

export default app;
