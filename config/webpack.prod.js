const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const path = require('path');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'myva_container',
      remotes: {
        todo: `myva_todo@${domain}/myva_todo/latest/remoteEntry.js`,
        cricket: `myva_cricket@${domain}/myva_cricket/latest/remoteEntry.js`,
        auth: `myva_auth@${domain}/myva_auth/latest/remoteEntry.js`,
        dashboard: `myva_dashboard@${domain}/myva_dashboard/latest/remoteEntry.js`,
        et: `myva_et@${domain}/myva_et/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
