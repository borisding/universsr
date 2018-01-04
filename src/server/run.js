import isDev from 'isdev';
import favicon from 'serve-favicon';
import serve from '@bin/serve';
import syspath from '@config/syspath';
import { print } from '@utils';

export default async function run(app) {
  try {
    if (isDev) {
      const errorHandler = require('errorhandler');
      const webpackCompiler = require('@build/webpack/compiler');

      await webpackCompiler(app);

      app.set('views', `${syspath.resources}/views`);
      app.use(errorHandler());
    } else {
      const clientStats = require('@public/stats.json');
      const serverRenderer = require('@server/index-built').default;

      app.set('views', syspath.public);
      app.use(favicon(`${syspath.public}/icons/favicon.png`));
      app.use(serverRenderer({ clientStats }));
    }

    serve(app);
  } catch (err) {
    print.error(err.stack, -1);
  }
}
