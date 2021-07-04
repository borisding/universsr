import path from 'path';

const root = path.resolve(process.cwd());

export default {
  root,
  app: `${root}/app`,
  build: `${root}/build`,
  bundler: `${root}/bundler`,
  config: `${root}/config`,
  resources: `${root}/resources`,
  icons: `${root}/resources/icons`,
  utils: `${root}/resources/utils`
};
