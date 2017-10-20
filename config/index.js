const convict = require('convict');

// application configuration in general
const config = convict({
  env: {
    doc: 'The application valid environment values.',
    format: ['production', 'prod', 'development', 'dev', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The express server IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The express server port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  secret: {
    doc: 'Secret used for application session cookies and CSRF tokens',
    format: '*',
    default: 'please.change.this.default.to.your.secret.value',
    sensitive: true
  }
});

config.validate();

module.exports = config;
