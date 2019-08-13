// load environment variables at first place
require('./env');

// expose app with esm loader
require('./esm.config')('./app/index');
