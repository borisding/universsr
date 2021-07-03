import path from 'path';

const root = path.resolve(process.cwd());

export default {
  root,
  app: `${root}/app`,
  build: `${root}/build`,
  config: `${root}/config`,
  resources: `${root}/resources`,
  icons: `${root}/resources/icons`,
  webpack: `${root}/webpack`
};
