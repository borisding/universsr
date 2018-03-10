const root = require('app-root-path').path;

// export application root and related
module.exports = {
  root,
  bin: `${root}/bin`,
  build: `${root}/build`,
  resources: `${root}/resources`,
  config: `${root}/resources/config`,
  logs: `${root}/resources/logs`,
  public: `${root}/public`,
  src: `${root}/src`
};
