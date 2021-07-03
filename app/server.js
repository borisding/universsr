import 'make-promises-safe';
import express from 'express';
import chalk from 'chalk';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import favicon from 'serve-favicon';
import { httpLogger } from './middleware';
import { env, paths } from '../utils';

const app = express();

// could add more middleware here where applicable
app.use(httpLogger());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());
app.use(compression());
app.use(express.static(paths.build));
app.use(favicon(`${paths.build}/icons/favicon.ico`));

// use webpack compiler for development
// otherwise, use built server side renderer instead
if (env.isDev) {
  const { default: webpackCompiler } = require('../bundler/webpack.compiler');
  app.use(webpackCompiler(() => runHttpServer()));
} else {
  const { default: ssr } = require('../build/ssr');
  app.use(ssr());
  runHttpServer();
}

// running app http server
function runHttpServer() {
  const PORT = parseInt(process.env.PORT, 10) || 3000;
  app
    .listen(PORT, () => {
      console.info(chalk.cyan(`App server is listening PORT: ${PORT}`));
    })
    .on('error', err => {
      console.error(chalk.red(err.message));
      process.exit(-1);
    });
}
