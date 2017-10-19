const isDev = require('isdev');

// runtime hook for development
if (isDev) {
  const sass = require('node-sass');
  const pkg = require('./package');

  require('css-modules-require-hook')({
    rootDir: './src/',
    extensions: ['.css', '.scss'],
    generateScopedName: pkg.cssModules.scopedName,
    preprocessCss: (data, file) =>
      sass.renderSync({ data, file }).css.toString('utf8')
  });
}

require('./src/server/app');
