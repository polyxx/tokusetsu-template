const autoprefixer = require('autoprefixer');
const path = require('path');
const postcssApply = require('postcss-apply');
const postcssCustomMedia = require('postcss-custom-media');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomSelectors = require('postcss-custom-selectors');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const reporter = require('postcss-reporter');
const stylelint = require('stylelint');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = './src';
const dist = './dist';

module.exports = {
  entry: {
    'js/app': [
      'webpack-dev-server/client?http://localhost:8088',
      'webpack/hot/only-dev-server',
      `${src}/js/app.js`
    ]
  },
  output: {
    path: dist,
    filename: '[name].bundle.js'
  },
  resolve: {
    root: [
      path.resolve(`${src}/js`)
    ],
    extensions: [
      '',
      '.js'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(pug)$/,
        loader: 'pug'
      },
      {
        test: /\.(css|pcss)$/,
        loader: ExtractTextPlugin.extract('style', [
          'css',
          'postcss'
        ])
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=img/[name].[ext]'
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin('css/app.min.css'),
    new HtmlWebpackPlugin({
      template: `${src}/html/index.pug`
    })
  ],
  postcss() {
    return [
      postcssImport({
        plugins: [
          stylelint()
        ]
      }),
      postcssApply,
      postcssCustomMedia,
      postcssCustomProperties,
      postcssCustomSelectors,
      postcssNested,
      postcssFlexbugsFixes,
      autoprefixer({
        browsers: ['last 2 versions']
      }),
      reporter({
        clearReportedMessages: true
      })
    ];
  }
};
