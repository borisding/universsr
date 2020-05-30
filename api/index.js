import 'make-promises-safe';
import express from 'express';
import http from 'http';
import colors from 'colors';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { httpLogger, errorHandler, notFoundHandler } from '@middleware';
import routes from './routes';

const api = express();

api.use(httpLogger());
api.use(helmet());
api.use(cookieParser());
api.use(express.json());
api.use(express.urlencoded({ extended: true, limit: '10mb' }), hpp());
api.get('/favicon.ico', (req, res) => res.status(204));

api.use(`/api/${process.env.API_VERSION}`, routes);
api.use(notFoundHandler());
api.use(errorHandler({ json: true }));

// running api server
const server = http.createServer(api);
const host = process.env.API_HOST || 'localhost';
const port = parseInt(process.env.API_PORT, 10) || 3030;

server.listen(port, host);
server.on('listening', () => {
  console.info(colors.cyan(`API server is listening PORT: ${port}`));
  console.log();
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      console.error(colors.red('Not enough privileges to run API server.'));
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
