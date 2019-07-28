module.exports = {
  // export named `helmet` as part of config
  helmet: require('./helmet'),

  // export named `syspath` as part of config
  syspath: require('./syspath'),

  // export named `isDev` as part of config
  isDev: process.env.NODE_ENV === 'development',

  // export named `isTest` as part of config
  isTest: process.env.NODE_ENV === 'test',

  // export named `isNode` as part of config
  isNode: require('detect-node')
};
