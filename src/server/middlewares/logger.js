import fs from 'fs';
import isDev from 'isdev';
import morgan from 'morgan';
import syspath from '@config/syspath';

const logger = () => {
  if (isDev) {
    return morgan('dev');
  }

  return morgan('combined', {
    stream: fs.createWriteStream(`${syspath.logs}/access.log`, {
      flags: 'a'
    }),
    skip: (req, res) => res.statusCode < 400
  });
};

export default logger;
