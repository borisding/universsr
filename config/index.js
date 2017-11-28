const convict = require('convict');
const syspath = require('./syspath');

// application's default node config in general
const config = convict({
  env: {
    doc: 'The application valid environment values.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  host: {
    doc: 'The express server host.',
    format: String,
    default: 'localhost',
    env: 'HOST'
  },
  port: {
    doc: 'The express server port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  apiBaseUrl: {
    doc: 'The API base URL',
    format: 'url',
    default: 'http://localhost:3000/api/'
  },
  secret: {
    doc: 'Secret used for application session cookies and CSRF tokens',
    format: '*',
    default: 'your.default.secret',
    sensitive: true
  }
});

// load targeted environment json config file and validate it
config
  .loadFile(`${syspath.config}/env/${process.env.NODE_ENV}.json`)
  .validate();

module.exports = config;
