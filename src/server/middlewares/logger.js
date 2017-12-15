const fs = require('fs');
const isDev = require('isdev');
const morgan = require('morgan');
const syspath = require('../../../config/syspath');

module.exports = logger = () => {
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
