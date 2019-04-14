import 'make-promises-safe';
import colors from 'colors';
import http from 'http';
import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { syspath } from '@config';
import { httpLogger, errorHandler } from '@middleware';
import routers from './routers';

const api = express();

// session configuration for file storage
const FileStore = sessionFileStore(session);
const fileSession = () =>
  session({
    store: new FileStore({ path: `${syspath.storage}/sessions` }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) }
  });

api
  .use(httpLogger())
  .use(helmet())
  .use(cookieParser())
  .use(fileSession())
  .use(express.json())
  .use(express.urlencoded({ extended: true, limit: '10mb' }), hpp())
  .use(`/api/${process.env.API_VERSION}`, routers)
  .get('/favicon.ico', (req, res) => res.status(204)); // simply ignore

// mount error handler middleware last
api.use(errorHandler({ json: true }));

// running api server
const server = http.createServer(api);
const serverPort = parseInt(process.env.API_PORT, 10) || 3030;

server.listen(serverPort);

server.on('listening', () => {
  console.info(colors.cyan(`API server is listening PORT: ${serverPort}`));
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      console.error(colors.red('Not enough privileges to run API server.'));
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

export default api;
