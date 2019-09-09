const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = {
  mode: 'development',
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
            plugins: [
              '@babel/plugin-syntax-bigint',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    })
  ],
  devtool: 'source-map'
};

const appConfig = {
  ...baseConfig,
  entry: './src/index.ts',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  }
};

const workerConfig = {
  ...baseConfig,
  entry: './src/fibonacci/fib.worker.ts',
  target: 'webworker',
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = [appConfig, workerConfig];
