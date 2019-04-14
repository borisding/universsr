const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  api: `${root}/api`,
  app: `${root}/app`,
  config: `${root}/config`,
  logger: `${root}/logger`,
  middleware: `${root}/middleware`,
  public: `${root}/public`,
  storage: `${root}/storage`,
  utils: `${root}/utils`
};
