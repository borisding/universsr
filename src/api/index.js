import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { ENV } from '@config';
import { logger, errorHandler } from '@middlewares';
import routers from './routers';

const api = express();

// session configuration for file storage
const FileStore = sessionFileStore(session);
const fileSession = () =>
  session({
    store: new FileStore(),
    resave: false,
    saveUninitialized: false,
    secret: ENV['SECRET_KEY'],
    cookie: { maxAge: ENV['COOKIE_MAXAGE'] }
  });

api
  .use(logger.http())
  .use(helmet())
  .use(cookieParser())
  .use(fileSession())
  .use(express.json())
  .use(express.urlencoded({ extended: true, limit: '10mb' }), hpp())
  .use(`/api/${ENV['API_VERSION']}`, routers);

// mount error handler middleware last
api.use(errorHandler({ json: true }));

export default api;
