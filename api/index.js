import 'make-promises-safe';
import http from 'http';
import express from 'express';
import colors from 'colors';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { httpLogger, errorHandler, notFoundHandler } from '@middleware';
import routers from './routers';

const api = express();

api
  .use(httpLogger())
  .use(helmet())
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: true, limit: '10mb' }), hpp())
  .use(`/api/${process.env.API_VERSION}`, routers)
  .get('/favicon.ico', (req, res) => res.status(204)); // simply ignore

// mount not found and error handler middlewares
api.use(notFoundHandler()).use(errorHandler({ json: true }));

// running api server
const server = http.createServer(api);
const host = process.env.API_HOST || 'localhost';
const port = parseInt(process.env.API_PORT, 10) || 3030;

server.listen(port, host);

server.on('listening', () => {
  console.info(colors.cyan(`API server is listening PORT: ${port}`));
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

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    server.close();
    process.exit();
  });
});

export default api;
