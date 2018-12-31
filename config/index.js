module.exports = {
  // export named `helmet` as part of config
  helmet: require('./helmet'),

  // export named `syspath` as part of config
  syspath: require('./syspath'),

  // export named `isDev` as part of config
  isDev: require('isdev'),

  // export named `isNode` as part of config
  isNode: require('detect-node')
};
