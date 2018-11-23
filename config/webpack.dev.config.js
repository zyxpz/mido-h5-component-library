const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackMerge = require('webpack-merge');

const {
  path,
  APP_PATH,
  myip,
  milieu,
  commonConfig
} = require('./webpack.common.config');

const devConfig = {
  mode: milieu,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(APP_PATH, 'src/static/index.tpl.html'),
      chunks: ['common', 'main'], // 当前路由所包含的模块，注意common引入方式
      inject: 'body',
      filename: './index.html'
    })
  ]
}

const config = webpackMerge(commonConfig, devConfig);

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, 'dist'),
  historyApiFallback: {
    rewrites: [{
      from: /./,
      to: './error.html'
    }]
  },
  hot: true,
  inline: true,
  stats: 'none',
  // quiet: true,
  overlay: true,
  inline: true,
  hot: true
});

server.listen('8001', () => {
  console.log('服务器已启动');
})