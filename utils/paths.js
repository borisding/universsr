import path from 'path';

const root = path.resolve(process.cwd());
const paths = {
  root,
  app: `${root}/app`,
  build: `${root}/build`,
  bundler: `${root}/bundler`,
  config: `${root}/config`,
  resources: `${root}/resources`,
  icons: `${root}/resources/icons`,
  utils: `${root}/utils`
};

export default paths;
