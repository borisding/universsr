import fs from 'fs';
import morgan from 'morgan';
import { DEV, SYSPATH } from '@config';

const logger = () => {
  if (DEV) {
    return morgan('dev');
  }

  return morgan('combined', {
    stream: fs.createWriteStream(`${SYSPATH['logs']}/access.log`, {
      flags: 'a'
    }),
    skip: (req, res) => res.statusCode < 400
  });
};

export default logger;
