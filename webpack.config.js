
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const NodeEnvPlugin = require('node-env-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  mode: 'development',
  plugins: [
    new CopyPlugin([
      { from: './db.json', to: './db.json' },
    ]),
    new NodeEnvPlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new NodemonPlugin({
    }),
  ],
  entry: { 'src/handler': './src/handler.js' },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
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
