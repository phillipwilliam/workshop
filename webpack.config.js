const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, '/dist'),
      hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                include: /src/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                        '@babel/preset-react'
                    ]
                  }
                }
              },
              {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: [
                  'file-loader?limit=100000',
                  'img-loader'
              ]
          }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
      new MiniCssExtractPlugin({
          filename: 'bundle.css'
      }),
      new HtmlWebPackPlugin({
        template: process.cwd() + '/src/index.html',
        filename: 'index.html'
    })
    ]
  }; 