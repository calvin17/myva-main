const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
    },
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
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
