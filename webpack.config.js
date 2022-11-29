const path = require('path');
// const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development',
  devtool: 'eval',
  resolve: {  // 읽을 확장자
    extensions: ['.js', '.jsx'],
  },
  
  entry: {
    app: ['./client'],  // resolve 옵션에 등록된 확장자는 생략 가능
  },  // 입력
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',   // 옛날 설정 바꿔줌
      options: {  
        presets: [  // 플러그인들의 모음
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'],   // 한국에서 1% 점유율을 가진 브라우저들을 호환되도록
            },
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel',
        ],
      }
    }],
  },
  plugins: [
    new RefreshWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist',
  },  // 출력
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};