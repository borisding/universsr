import 'make-promises-safe';
import express from 'express';
import isDev from 'isdev';
import http from 'http';
import cors from 'cors';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { SECRET_KEY, API_VERSION, API_PORT } from '@config';
import { logger } from '@middlewares/express';
import { print } from '@utils';
import routers from './routers';

const app = express();

app
  .set('etag', !isDev)
  .set('json spaces', 2)
  .disable('x-powered-by')
  .use(logger())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp()) // after parsed body
  .use(cookieParser(SECRET_KEY))
  .use(`/api/${API_VERSION}`, routers);

const server = http.createServer(app);
const serverPort = process.env.API_PORT || API_PORT;

server.listen(serverPort);
server.on('listening', () => {
  const address = server.address();

  print.info('API Server is up! Listening: %s', 0, [
    'port' in address ? address.port : address
  ]);
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      print.error('Not enough privileges to run API server.', -1);
      break;
    case 'EADDRINUSE':
      print.error('%s is already in use.', -1, [serverPort]);
      break;
    default:
      throw err;
  }
});

export default app;
