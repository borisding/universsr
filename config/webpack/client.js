const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { isDev, syspath } = require('@config');
const webpackCommon = require('./common');

module.exports = function clientConfig(env) {
  const commonConfig = webpackCommon('client');
  const isAnalyze = process.env.ANALYZE_MODE === 'enabled';

  return {
    target: 'web',
    name: 'client',
    mode: commonConfig.mode,
    context: commonConfig.context,
    devtool: commonConfig.devtool,
    resolve: commonConfig.resolve,
    // for more about performance hints
    // @see: https://webpack.js.org/configuration/performance/#performance
    performance: {
      maxEntrypointSize: 400000,
      maxAssetSize: 400000
    },
    entry: [
      ...(isDev
        ? ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true']
        : []),
      './client.js'
    ],
    output: {
      path: syspath.public,
      publicPath: commonConfig.publicPath,
      filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
      chunkFilename: isDev
        ? '[name].chunk.js'
        : '[name].chunk.[contenthash:8].js'
    },
    optimization: {
      // @see: https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      // @see: https://github.com/NMFR/optimize-css-assets-webpack-plugin
      minimizer: [new TerserJSPlugin(), new OptimizeCssAssetsPlugin()],
      splitChunks: {
        chunks: 'all' // all types of chunks
      }
    },
    module: {
      rules: [
        commonConfig.getBabelRule(),
        commonConfig.getHotWebpackRule(),
        commonConfig.getImagesRule(),
        commonConfig.getFontsRule(),
        commonConfig.getCssModulesRule(MiniCssExtractPlugin),
        commonConfig.getGlobalStylesRule(MiniCssExtractPlugin)
      ]
    },
    plugins: [
      new webpack.DefinePlugin(env.getCustomEnv().stringified),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
        chunkFilename: isDev
          ? '[name].chunk.css'
          : '[name].chunk.[contenthash:8].css'
      }),
      new CopyWebpackPlugin([
        {
          from: `${syspath.app}/assets/manifest.json`,
          to: syspath.public
        },
        {
          from: `${syspath.app}/assets/icons`,
          to: `${syspath.public}/icons`
        }
      ])
    ].concat(
      isDev
        ? [new webpack.HotModuleReplacementPlugin()]
        : [
            new StatsWebpackPlugin('stats.json'),
            new OfflinePlugin({
              externals: ['/'],
              publicPath: commonConfig.publicPath,
              relativePaths: false, // to allow using publicPath
              ServiceWorker: { events: true }, // use ServiceWorker for offline usage
              AppCache: false // disable for AppCache
            }),
            // for more webpack bundle analyzer options,
            // @see: https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin
            new BundleAnalyzerPlugin({
              analyzerMode: isAnalyze ? 'server' : 'disabled',
              openAnalyzer: isAnalyze
            })
          ]
    )
  };
};
