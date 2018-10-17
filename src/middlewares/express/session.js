import extend from 'extend';
import cookieSession from 'cookie-session';
import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import connectFile from 'session-file-store';
import { ENV } from '@config';

const maxAge = 24 * 60 * 60 * 1000; // 1 day

// default options for express-session middleware
// @see: https://github.com/expressjs/session#sessionoptions
const sessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: ENV['SECRET_KEY'],
  cookie: { maxAge }
};

const session = {
  // @see: https://github.com/expressjs/cookie-session#cookiesessionoptions
  cookie(options = {}) {
    return cookieSession(
      extend({ secret: ENV['SECRET_KEY'], maxAge }, options)
    );
  },

  // @see: https://github.com/valery-barysok/session-file-store#options
  file(options = {}) {
    const FileStore = connectFile(expressSession);

    return expressSession(
      extend({ store: new FileStore(options) }, sessionOptions)
    );
  },

  // @see: https://github.com/tj/connect-redis#options
  redis(options = {}) {
    const RedisStore = connectRedis(expressSession);

    return expressSession(
      extend({ store: new RedisStore(options) }, sessionOptions)
    );
  }
};

export default session;
