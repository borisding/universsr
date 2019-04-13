const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  api: `${root}/api`,
  app: `${root}/app`,
  bin: `${root}/bin`,
  config: `${root}/config`,
  logger: `${root}/logger`,
  middlewares: `${root}/middlewares`,
  public: `${root}/public`,
  resources: `${root}/resources`,
  storage: `${root}/storage`,
  utils: `${root}/utils`
};
