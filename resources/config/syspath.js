const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  build: `${root}/build`,
  resources: `${root}/resources`,
  config: `${root}/resources/config`,
  logs: `${root}/resources/logs`,
  public: `${root}/public`,
  src: `${root}/src`
};
