const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const LiveReloadPlugin = require('webpack-livereload-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  entry: './src/index',
  mode: 'development',
  devtool: 'source-map',
  // output: {
  //   publicPath: 'auto',
  // },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
          output: {
            comments: false,
          },
          sourceMap: true, 
        },
        extractComments: false,
      }),
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
    // historyApiFallback: {
    //   index: 'index.html',
    // },
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'myva_container',
      remotes: {
        todo: 'myva_todo@http://localhost:8082/remoteEntry.js',
        cricket: 'myva_cricket@http://localhost:8083/remoteEntry.js',
        auth: 'myva_auth@http://localhost:8084/remoteEntry.js',
        et: 'myva_et@http://localhost:8085/remoteEntry.js',
        dashboard: 'myva_dashboard@http://localhost:8087/remoteEntry.js',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      }
    }),
    // new ExternalTemplateRemotesPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify('development'), 
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // new ReactRefreshWebpackPlugin(),
    // new LiveReloadPlugin({
    //   port: 35729,
    // }),
  ],
};

module.exports = merge(commonConfig, devConfig);
