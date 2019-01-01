// load environment variables for `production` at first place
if (process.env.NODE_ENV === 'production') {
  require('./scripts/env');
}

// expose api server with esm loader
require('./esm')('./bin/apiServer');
