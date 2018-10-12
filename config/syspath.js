const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  bin: `${root}/bin`,
  build: `${root}/build`,
  resources: `${root}/resources`,
  config: `${root}/config`,
  logs: `${root}/resources/logs`,
  public: `${root}/public`,
  src: `${root}/src`
};
