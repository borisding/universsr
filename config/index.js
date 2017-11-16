const convict = require('convict');
const syspath = require('./syspath');

// application configuration in general
const config = convict({
  env: {
    doc: 'The application valid environment values.',
    format: ['production', 'prod', 'development', 'dev', 'test'],
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
    default: 5000,
    env: 'PORT'
  },
  secret: {
    doc: 'Secret used for application session cookies and CSRF tokens',
    format: '*',
    default: 'your.default.secret',
    sensitive: true
  }
});

config.loadFile(`${syspath.config}/config.json`).validate();

module.exports = config;
