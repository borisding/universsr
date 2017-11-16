#!/usr/bin/env node

const http = require('http');
const config = require('../config');
const { error, info } = require('../src/utils');

module.exports = function serve(app) {
  // running server based on the config
  const server = http.createServer(app);

  server.listen(config.get('port'));

  // server on listening event
  server.on('listening', () => {
    const address = server.address();

    info('Server is up! Listening: %s', 0, [
      'port' in address ? address.port : address
    ]);
  });

  // server on error event
  server.on('error', err => {
    switch (err.code) {
      case 'EACCES':
        error('Not enough privileges to run server.', -1);
        break;
      case 'EADDRINUSE':
        error('%s is already in use.', -1, [config.get('port')]);
        break;
      default:
        throw err;
    }
  });

  process.on('unhandledRejection', err => {
    error(err.stack, -1);
  });
};
