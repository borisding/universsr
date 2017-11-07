const express = require('express');
const isDev = require('isdev');
const favicon = require('serve-favicon');
const serve = require('../../bin/serve');
const syspath = require('../../config/syspath');
const webpackCompiler = require('../../build/webpack-compiler');

module.exports = async app => {
  try {
    const compiler = await webpackCompiler(app);

    if (isDev) {
      app.set('views', `${syspath.src}/resources/views`);
      app.use(require('errorhandler')());

      serve(app);
    } else {
      compiler.run((err, stats) => {
        if (err) {
          throw new Error(err);
        }

        const clientStats = stats.toJson().children[0];
        const serverRenderer = require('./index-built').default;

        app.set('views', syspath.public);
        app.use(express.static(syspath.public));
        app.use(favicon(`${syspath.public}/dist/icons/favicon.png`));
        app.use(serverRenderer({ clientStats }));

        serve(app);
      });
    }
  } catch (err) {
    throw new Error(err.stack);
  }
};
