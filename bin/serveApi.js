#!/usr/bin/env node

const http = require('http');
const { apiPort } = require('@config/properties');
const { error, info } = require('@utils');

module.exports = function serveApi(app) {
  // running api server based on the config
  const server = http.createServer(app);

  server.listen(apiPort);

  // server on listening event
  server.on('listening', () => {
    const address = server.address();

    info('API Server is up! Listening: %s', 0, [
      'port' in address ? address.port : address
    ]);
  });

  // server on error event
  server.on('error', err => {
    switch (err.code) {
      case 'EACCES':
        error('Not enough privileges to run API server.', -1);
        break;
      case 'EADDRINUSE':
        error('%s is already in use.', -1, [apiPort]);
        break;
      default:
        throw err;
    }
  });

  process.on('unhandledRejection', err => {
    error(err.stack, -1);
  });
};
