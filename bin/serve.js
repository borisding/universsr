#!/usr/bin/env node

import 'make-promises-safe';
import http from 'http';
import { port } from '@config/properties';
import { print } from '@utils';

export default function serve(app) {
  // running server based on the config
  const server = http.createServer(app);

  server.listen(port);

  // server on listening event
  server.on('listening', () => {
    const address = server.address();

    print.info('App Server is up! Listening: %s', 0, [
      'port' in address ? address.port : address
    ]);
  });

  // server on error event
  server.on('error', err => {
    switch (err.code) {
      case 'EACCES':
        print.error('Not enough privileges to run server.', -1);
        break;
      case 'EADDRINUSE':
        print.error('%s is already in use.', -1, [port]);
        break;
      default:
        throw err;
    }
  });
}
