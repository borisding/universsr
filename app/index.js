import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import favicon from 'serve-favicon';
import cors from 'cors';

import runHttpServer from './server';
import { httpLogger } from './middleware';
import { env, paths } from '../utils';

const app = express();

// could add more middleware here where applicable
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());
app.use(compression());

// serve static files
app.use(express.static(paths.build));
app.use('/icons', express.static(paths.icons));
app.use(favicon(`${paths.icons}/favicon.ico`));

// use webpack compiler for development
// otherwise, use built server side renderer instead
if (env.isDev) {
  const { default: webpackCompiler } = require('../bundler/webpack.compiler');
  app.use(webpackCompiler(() => runHttpServer(app)));
} else {
  const { default: serverRenderer } = require('../build/serverRenderer');
  app.use(serverRenderer());
  runHttpServer(app);
}
