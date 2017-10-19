const fs = require('fs');
const morgan = require('morgan');
const syspath = require('../../config/syspath');

const writeLog = file => {
  return {
    stream: fs.createWriteStream(`${syspath.logs}/${file}.log`, {
      flags: 'a'
    }),
    skip: (req, res) => res.statusCode < 400
  };
};

module.exports = app => {
  if (_DEV_) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined', writeLog('access')));
  }
};
