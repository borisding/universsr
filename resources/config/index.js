// default config entry file with respective configuration values
// this entry is going to be used in `src` across app and api

// export built config.properties.json for universal usage
module.exports = require('./config.properties');

// export named `SYSPATH` as part of config
module.exports.SYSPATH = require('./syspath');

// export named `DEV` as part of config
module.exports.DEV = require('isdev');

// export named `NODE` as part of config
module.exports.NODE = require('detect-node');
