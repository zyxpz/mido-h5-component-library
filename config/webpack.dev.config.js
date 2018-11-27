const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackMerge = require('webpack-merge');

const chalk = require('chalk');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

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

config.plugins.push(
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {},
    onErrors: () => {},
    clearConsole: true,
    additionalFormatters: [],
    additionalTransformers: []
  })
)

const compiler = webpack(config);

// compiler.hooks.done.tap('dev', stats => {
//   if (stats.hasErrors()) {
//     process.stdout.write('\x07');
//     console.log('webpack error')
//     return;
//   }
// })

const server = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, 'dist'),
  historyApiFallback: false,
  hot: true,
  inline: true,
  stats: 'none',
  quiet: true,
  overlay: true,
  inline: true,
  hot: true,
  compress: true
});

server.listen('8001', 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(chalk.cyan('Starting the development server...\n'));
  console.log(chalk.cyan('http://localhost:8001\n'));
})