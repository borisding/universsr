module.exports = {
  // export named `HELMET` as part of config
  HELMET: require('./helmet'),

  // export named `SYSPATH` as part of config
  SYSPATH: require('./syspath'),

  // export named `DEV` as part of config
  DEV: require('isdev'),

  // export named `NODE` as part of config
  NODE: require('detect-node')
};
