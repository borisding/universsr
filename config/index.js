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
  publicPath: {
    doc: 'The public path of application.',
    format: String,
    default: '/'
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
    default: process.env.PORT || 3000,
    env: 'PORT'
  },
  apiBaseUrl: {
    doc: 'The API base URL',
    format: 'url',
    default: 'http://localhost:3000/api'
  },
  apiVersion: {
    doc: 'The version of API to be used.',
    format: String,
    default: 'v1'
  },
  secret: {
    doc: 'Secret used for application session cookies and CSRF tokens',
    format: '*',
    default: 'your.default.secret',
    sensitive: true
  }
});

// load and merge targeted environment json config file with default values
// and then perform the validation for the configuration values
let envFilename = 'production';

if (process.env.NODE_ENV === 'development') {
  envFilename = process.env.NODE_ENV;
}

config.loadFile(`${syspath.config}/env/${envFilename}.json`).validate();

module.exports = config;
