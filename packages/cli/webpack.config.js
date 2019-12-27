
const nodeExternals = require('webpack-node-externals');
const NodeEnvPlugin = require('node-env-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { join } = require('path');


module.exports = {
  mode: 'development',
  plugins: [
    new NodeEnvPlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    process.env.NODE_ENV === 'debug' || process.env.NODE_ENV === 'development' ? new NodemonPlugin({ nodeArgs: ['--inspect-brk'] }) : new NodemonPlugin(),
  ],
  entry: { 'src/server': './src/server.ts' },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs',
    path: join(__dirname, '.webpack'),
    filename: 'index.js',

    // Bundle absolute resource paths in the source-map,
    // so VSCode can match the source file.
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },

  target: 'node',
  externals: [nodeExternals({
    whitelist: ['swagger-ui-express', 'json-server'],
  })],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};
