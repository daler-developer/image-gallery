const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (api) => {
  return {
    mode: 'development',
    entry: {
      main: path.join(__dirname, 'src', 'index.tsx'),
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        favicon: path.join(__dirname, 'src', 'assets', 'logo.jpg')
      }),
      new MiniCssExtractPlugin(),
    ],
    devServer: {
      port: 3000,
      open: false,
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:4000',
      },
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.scss'],
      modules: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules'),
      ],
      alias: {
        '@mui/styled-engine': '@mui/styled-engine-sc'
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
        },
        {
          test: /\.css?$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.scss?$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  }
}
