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
const csswring = require('csswring');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = './src';
const docs = './docs';

module.exports = {
  entry: {
    'js/app': [
      `${src}/js/app.js`
    ]
  },
  output: {
    path: docs,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
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
        browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >= 8.0']
      }),
      reporter({
        clearReportedMessages: true
      }),
      csswring()
    ];
  }
};
