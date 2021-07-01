import path from 'path';

const root = path.resolve(process.cwd());

export default {
  root,
  app: `${root}/app`,
  assets: `${root}/assets`,
  build: `${root}/build`,
  config: `${root}/config`,
  public: `${root}/public`,
  storage: `${root}/storage`,
  webpack: `${root}/webpack`
};
