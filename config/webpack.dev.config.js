const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackMerge = require('webpack-merge');

const chalk = require('chalk');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const stream = process.stderr;

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

const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  // console.info(percentage, message, ...args);
  if (percentage < 0.1) {
    stream.write(chalk.cyan('Starting the development server...\n'));
  } else if (percentage < 0.7) {
    stream.cursorTo(0);
    stream.write(`📦  ${chalk.magenta(message)} ${chalk.magenta(args[0])}`);
    stream.clearLine(1);
  }
};

config.plugins.push(
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [`Dev Server: http://localhost:8001`],
      notes: [`Success!`]
    },
    onErrors: () => {},
    clearConsole: true,
    additionalFormatters: [],
    additionalTransformers: []
  }),
  new webpack.ProgressPlugin(handler)
)

const compiler = webpack(config);

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
})