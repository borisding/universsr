const express = require('express');
const isDev = require('isDev');
const favicon = require('serve-favicon');
const webpackHandlers = require('../../build/webpack-handlers');
const syspath = require('../../config/syspath');

// webpack compiler & both client and server hot reload for development
// using built server renderer instead for production
module.exports = app => {
  if (!isDev) {
    app.use(express.static(syspath.public));
    app.use(favicon(`${syspath.public}/dist/icons/favicon.ico`));

    const serverRenderer = require('./index-built').default;
    return app.use(serverRenderer());
  }

  return webpackHandlers(app);
};
