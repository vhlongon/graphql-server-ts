const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/client/index.tsx',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/public'),
    clean: true,
    publicPath: isProduction ? '/public' : '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist/public'),
    port: 3000,
    open: true,
    hot: true,
  },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.TEST_VAR': JSON.stringify('WHATEVER'),
    // }),
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      hash: true, // This is useful for cache busting
      filename: '../public/index.html',
    }),
  ],
};
