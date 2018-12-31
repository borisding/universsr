const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  bin: `${root}/bin`,
  config: `${root}/config`,
  public: `${root}/public`,
  resources: `${root}/resources`,
  src: `${root}/src`,
  storage: `${root}/storage`
};
