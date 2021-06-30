import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LoadablePlugin from '@loadable/webpack-plugin';

import { isDev, syspath } from '../config';
import { getDefinedVars } from '../env.loader';
import webpackCommon from './common';

const commonConfig = webpackCommon('client');
const isAnalyze = process.env.ANALYZE_MODE === 'enabled';

export default {
  target: 'web',
  name: 'client',
  context: syspath.app,
  mode: commonConfig.mode,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  entry: [
    ...(isDev
      ? ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true']
      : []),
    './App.js'
  ],
  output: {
    path: syspath.public,
    publicPath: commonConfig.publicPath,
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].chunk.[contenthash:8].js'
  },
  optimization: {
    // @see: https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    // @see: https://github.com/NMFR/optimize-css-assets-webpack-plugin
    minimizer: [new TerserJSPlugin(), new OptimizeCssAssetsPlugin()],
    splitChunks: {
      chunks: 'all' // all types of chunks
    }
  },
  // for more about performance hints
  // @see: https://webpack.js.org/configuration/performance/#performance
  performance: isDev
    ? { hints: false }
    : {
        maxEntrypointSize: 400000,
        maxAssetSize: 400000,
        assetFilter: assetFilename => {
          return !/\.map$/.test(assetFilename);
        }
      },
  module: {
    rules: [
      commonConfig.getBabelRule(),
      commonConfig.getImagesRule(),
      commonConfig.getFontsRule(),
      commonConfig.getCssModulesRule(MiniCssExtractPlugin),
      commonConfig.getStylesRule(MiniCssExtractPlugin)
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin(getDefinedVars().stringified),
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: isDev
        ? '[name].chunk.css'
        : '[name].chunk.[contenthash:8].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${syspath.assets}/icons`,
          to: `${syspath.public}/icons`
        }
      ]
    })
  ].concat(
    isDev
      ? [new webpack.HotModuleReplacementPlugin()]
      : [
          // for more webpack bundle analyzer options,
          // @see: https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin
          new BundleAnalyzerPlugin({
            analyzerMode: isAnalyze ? 'server' : 'disabled',
            openAnalyzer: isAnalyze
          })
        ]
  )
};
