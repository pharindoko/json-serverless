
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const NodeEnvPlugin = require('node-env-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { join } = require('path');

module.exports = {
  mode: 'development',
  plugins: [
    new CopyPlugin([
      { from: './db.json', to: './db.json' },
      { from: './config/appconfig.json', to: './config/appconfig.json' },
    ]),
    new NodeEnvPlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    process.env.NODE_ENV === 'debug' ? new NodemonPlugin({ nodeArgs: ['--inspect-brk'] }) : new NodemonPlugin(),
  ],
  entry: { 'src/handler': './src/handler.js' },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  devtool: 'source-map',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'handler.js',

    // Bundle absolute resource paths in the source-map,
    // so VSCode can match the source file.
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },

  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
