const APP_PATH = process.cwd();

const path = require('path');

const webpack = require('webpack');

const myip = require('my-ip')();

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackMerge = require('webpack-merge');

const milieu = process.env.NODE_ENV || 'development';

const {
  entry
} = require('../package.json');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: path.resolve(APP_PATH, 'postcss.config.js')
    }
  }
};

const config = {
  resolve: {
    mainFiles: ['index'],
    modules: [path.resolve(APP_PATH, 'src'), 'node_modules'],
    extensions: ['.js', 'jsx', '.vue', 'ts', '.json', '.less', '.css'],
    alias: {}
  },
  entry,
  output: {
    path: path.resolve(APP_PATH, 'dist'),
    filename: 'js/[name].[hash:8].bundle.js', // 每个页面对应的主js的生成配置
    chunkFilename: 'js/[name].[hash:8].chunk.js', // chunk生成的配置
    sourceMapFilename: 'js/[name].[hash:8].bundle.map',
    /**
     * html引用路径
     * publicPath: ENV_IS_DEV ? './' : 'https://cdn.example.com/'
     */
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.js?$/,
        exclude: [
          /**
           * 在node_modules的文件不被babel理会
           */
          path.resolve(APP_PATH, 'node_modules')
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true // 启用编译缓存
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          postcssLoader,
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          postcssLoader,
        ],
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.html$/i,
        use: 'html-loader'
      }
    ]
  },
  optimization: {
    minimize: milieu === 'production' ? true : false,
    // 原：NamedModulesPlugin()
    namedModules: true,
    // 原：NoEmitOnErrorsPlugin() - 异常继续执行
    noEmitOnErrors: true,
    // 原：ModuleConcatenationPlugin() - 模块串联 - dev模式下回影响antd（比如：Pagination, 和语言有关）
    concatenateModules: milieu !== 'development',
    /**
     * CommonsChunkPlugin
     */
    splitChunks: {
      cacheGroups: {
        vendor: { // node_modules内的依赖库
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100,
          // enforce: true?
        },
        common: { // ‘src/js’ 下的js文件
          chunks: "all",
          test: /[\\/]src[\\/]js[\\/]/, // 也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
          name: "common", // 生成文件名，依据output规则
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      allChunks: true
    })
  ]
}

const defaultConfig = {
  devtool: milieu === 'cheap-module-eval-source-map' ? 'true' : undefined,
  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    Buffer: true,
    clearImmediate: false,
    setImmediate: false
  },
  // 启用编译缓存
  cache: true,
}

module.exports = {
  path,
  APP_PATH,
  myip,
  milieu,
  commonConfig: webpackMerge(config, defaultConfig)
}