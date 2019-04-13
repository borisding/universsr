#!/usr/bin/env node

import 'make-promises-safe';
import colors from 'colors';
import http from 'http';
import api from '@api/index';

const server = http.createServer(api);
const serverPort = parseInt(process.env.API_PORT, 10) || 3030;

server.listen(serverPort);

server.on('listening', () => {
  console.info(colors.cyan(`API server is listening PORT: ${serverPort}`));
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      console.error(colors.red('Not enough privileges to run API server.'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(colors.red(`${serverPort} is already in use.`));
      process.exit(1);
      break;
    default:
      throw err;
  }
});

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    server.close(() => {
      process.exit();
    });
  });
});
