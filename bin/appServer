#!/usr/bin/env node

import 'make-promises-safe';
import colors from 'colors';
import http from 'http';
import app from '@app';
import { ENV, DEV } from '@config';

const server = http.createServer(app);
const serverPort = process.env.PORT || ENV['PORT'];

server.listen(serverPort);

server.on('listening', () => {
  console.info(colors.cyan(`App server is listening PORT: ${serverPort}`));

  if (DEV) {
    console.log(
      colors.green(`App is started at: http://localhost:${serverPort}`)
    );
  }
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      console.error(colors.red('Not enough privileges to run app server.'));
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

process.on('SIGINT', () => {
  process.exit(0);
});
