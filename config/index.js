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
    doc: 'The express app server host name.',
    format: String,
    default: 'localhost',
    env: 'HOST'
  },
  port: {
    doc: 'The express app server port to bind.',
    format: 'port',
    default: 5000,
    env: 'PORT'
  },
  apiHost: {
    doc: 'The API server host name.',
    format: String,
    default: 'localhost',
    env: 'API_HOST'
  },
  apiPort: {
    doc: 'The API server port to bind.',
    format: 'port',
    default: 5001,
    env: 'API_PORT'
  },
  apiVersion: {
    doc: 'The API version to be used.',
    format: String,
    default: 'v1'
  },
  proxyBaseURL: {
    doc: 'The targeted proxy base URL for mapping.',
    format: 'url',
    default: 'http://localhost:5001'
  },
  baseURL: {
    doc: 'The base URL of application. Could be the domain name.',
    format: 'url',
    default: 'http://localhost:5000'
  },
  timeout: {
    doc: 'The maximum duration for request timeout.',
    format: 'duration',
    default: 5000
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
