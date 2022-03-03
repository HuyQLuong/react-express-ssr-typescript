const path = require('path');
const fs = require('fs');

const webpackNodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


const rootDir = fs.realpathSync(process.cwd());
const srcDir = path.resolve(rootDir, './');
const buildDir = path.resolve(rootDir, 'build');



const common = {
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({filename: "styles.css",}),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: srcDir,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          'css-loader'
        ]
      }
    ],
  },
  resolve: {
    modules: ['node_modules', srcDir],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
};

const clientConfig = {
  ...common,
  target: 'web',
  name: 'client',
  entry: {
    client: path.resolve(srcDir, './client/index.tsx'),
  },
  output: {
    publicPath: '/',
    path: buildDir,
    filename: 'client.js',
  },

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         chunks: 'initial',
  //         name: 'vendor',
  //         test: module => /node_modules/.test(module.resource),
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  devtool: 'eval-source-map',
};

const serverConfig = {
  ...common,
  target: 'node',
  name: 'server',
  entry: {
    server: path.resolve(srcDir, './server/server.ts'),
  },
  output: {
    publicPath: '/',
    path: buildDir,
    filename: 'server.js',
  },
  devtool: 'eval-source-map',
  externals: [webpackNodeExternals()],
  node: {
    __dirname: false,
  },
};

module.exports = [clientConfig, serverConfig];