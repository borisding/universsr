import fs from 'fs';
import morgan from 'morgan';
import { DEV, SYSPATH } from '@config';

const logger = {};

// http access logger for both app and api
// we skip anything that is less than status code 400 for `production`
logger.http = () => {
  if (DEV) return morgan('dev');

  return morgan('combined', {
    stream: fsStreamWriter('access.log'),
    skip: (req, res) => res.statusCode < 400
  });
};

// exception logger for both app and api
// display stack trace in terminal for `development`
// or, simply write stack trace into `exception` log file for `production`
logger.exception = err => {
  if (!err.stack) return;
  if (DEV) return console.error(err.stack);

  const fsStream = fsStreamWriter('exception.log');

  fsStream.write(new Date().toString());
  fsStream.write('\r\n');

  fsStream.write(err.stack);
  fsStream.write('\r\n');

  fsStream.end();
};

const fsStreamWriter = filename => {
  return fs.createWriteStream(`${SYSPATH['logs']}/${filename}`, { flags: 'a' });
};

export default logger;
