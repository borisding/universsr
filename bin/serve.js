#!/usr/bin/env node

const http = require('http');
const config = require('../config');

module.exports = app => {
  // running server based on the config
  const server = http.createServer(app);

  server.listen(config.get('port'), config.get('host'));

  // server on listening event
  server.on('listening', () => {
    const address = server.address();
    console.info(
      `Server is up! Listening:${'port' in address ? address.port : address}`
    );
  });

  // server on error event
  server.on('error', err => {
    switch (err.code) {
      case 'EACCES':
        console.error('Not enough privileges to run server.');
        process.exit(-1);
        break;
      case 'EADDRINUSE':
        console.error(`${config.get('port')} is already in use.`);
        process.exit(-1);
        break;
      default:
        throw err;
    }
  });

  process.on('unhandledRejection', err => {
    console.error(err.stack);
    process.exit(-1);
  });
};
