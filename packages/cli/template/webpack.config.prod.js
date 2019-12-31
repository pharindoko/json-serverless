const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const appConfig = JSON.parse(fs.readFileSync('config/appconfig.json', 'UTF-8'));

module.exports = {
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new CopyPlugin([
      { from: appConfig.jsonFile, to: './db.json' },
      { from: './config/appconfig.json', to: './config/appconfig.json' },
    ]),
  ],
  entry: { './src/handler': './src/handler.ts' },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: 'handler.js',
  },
  target: 'node',
  externals: [nodeExternals({
    whitelist: ['swagger-ui-express', 'json-server'],
  })],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};
