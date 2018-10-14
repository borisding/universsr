import cookieSession from 'cookie-session';
import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import connectFile from 'session-file-store';
import { ENV } from '@config';

const FileStore = connectFile(expressSession);
const RedisStore = connectRedis(expressSession);

// default options for express-session middleware
// @see: https://github.com/expressjs/session#sessionoptions
const sessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: ENV['SECRET_KEY'],
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
};

const session = {
  // @see: https://github.com/expressjs/cookie-session#cookiesessionoptions
  cookie(options = {}) {
    return cookieSession({
      secret: ENV['SECRET_KEY'],
      ...options
    });
  },
  // @see: https://github.com/valery-barysok/session-file-store#options
  file(options = {}) {
    return expressSession({
      store: new FileStore({ ...options }),
      ...sessionOptions
    });
  },
  redis(options = {}) {
    return expressSession({
      store: new RedisStore({ ...options }),
      ...sessionOptions
    });
  }
};

export default session;
