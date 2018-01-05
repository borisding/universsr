#!/usr/bin/env node

import 'make-promises-safe';
import http from 'http';
import { apiPort } from '@config/properties';
import { print } from '@utils';

export default function serveApi(app) {
  // running api server based on the config
  const server = http.createServer(app);

  server.listen(apiPort);

  // server on listening event
  server.on('listening', () => {
    const address = server.address();

    print.info('API Server is up! Listening: %s', 0, [
      'port' in address ? address.port : address
    ]);
  });

  // server on error event
  server.on('error', err => {
    switch (err.code) {
      case 'EACCES':
        print.error('Not enough privileges to run API server.', -1);
        break;
      case 'EADDRINUSE':
        print.error('%s is already in use.', -1, [apiPort]);
        break;
      default:
        throw err;
    }
  });
}
