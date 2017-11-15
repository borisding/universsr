const fs = require('fs');
const isDev = require('isdev');
const morgan = require('morgan');
const syspath = require('../../config/syspath');

module.exports = function logger(app) {
  if (isDev) {
    app.use(morgan('dev'));
  } else {
    const logFile = `${syspath.logs}/access.log`;

    app.use(
      morgan('combined', {
        stream: fs.createWriteStream(logFile, { flags: 'a' }),
        skip: (req, res) => res.statusCode < 400
      })
    );
  }
};
