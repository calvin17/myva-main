const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'myva_container',
      remotes: {
        dashboard: 'myva_dashboard@http://localhost:8081/remoteEntry.js',
        todo: 'myva_todo@http://localhost:8082/remoteEntry.js',
        cricket: 'myva_cricket@http://localhost:8083/remoteEntry.js',
        auth: 'myva_auth@http://localhost:8084/remoteEntry.js',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
