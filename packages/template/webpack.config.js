const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const appConfig = JSON.parse(fs.readFileSync('config/appconfig.json', 'UTF-8'));

module.exports = {
  mode: 'production',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'dev', // use 'dev' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: appConfig.jsonFile, to: '../db.json' },
        { from: './config/appconfig.json', to: './config/appconfig.json' },
      ],
    }),
  ],
  entry: { './src/handler': './src/handler.ts' },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: 'handler.js',
  },
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['swagger-ui-express', 'json-server'],
    }),
  ],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};
