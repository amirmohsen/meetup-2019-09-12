const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  targets: {
                    chrome: '76'
                  }
                }
              ],
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-syntax-bigint']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    })
  ],
  devtool: 'source-map'
};

const workerConfig = {
  mode: 'development',
  entry: './src/fibonacci/fib.worker.ts',
  target: 'webworker',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  targets: {
                    chrome: '76'
                  }
                }
              ],
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-syntax-bigint']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map'
};

module.exports = [baseConfig, workerConfig];
