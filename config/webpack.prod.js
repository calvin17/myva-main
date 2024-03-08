const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const path = require('path');

const domain = process.env.PRODUCTION_DOMAIN || 'http://myvas3bucket.s3-website.eu-north-1.amazonaws.com';

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'myva_container',
      remotes: {
        todo: `${domain}/myva_todo/latest/remoteEntry.js`,
        cricket: `${domain}/myva_cricket/latest/remoteEntry.js`,
        auth: `${domain}/myva_auth/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
