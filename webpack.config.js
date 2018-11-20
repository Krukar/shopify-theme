const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js_shop.js'
  },
  output: {
    filename: 'js_shop.js',
    path: __dirname + '/theme/assets',
  },
  resolve:{
    alias: {
      Utilities: path.resolve('src/js/utilities/index.js'),
      SCSS: path.resolve('src/scss')
    },
    extensions: ['.js']
  },
  module: {
    rules:[
      {
        enforce: 'pre',
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        })
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use:[
          { loader: 'file-loader?name=[name].[ext]&outputPath=../assets/' }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css_shop.css'),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.scss',
      syntax: 'scss',
      failOnError: false,
      quiet: false,
      fix: false
    })
  ]
}
