const webpack = require('webpack');

const webpackMerge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const notifier = require('node-notifier');

const {
	entry,
	webpackHtmls,
	openPage
} = require('./temp.config');

const {
	path,
	APP_PATH,
	myip,
	milieu,
	commonConfig,
	port,
} = require('./webpack.common.config');

console.log('NODE_ENV:', milieu);

const distConfig = {
	mode: milieu,
	entry,
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(APP_PATH, 'templates/index.tpl.ejs'),
			chunks: ['common', 'main'], // 当前路由所包含的模块，注意common引入方式
			inject: false,
			filename: './index.html',
			title: `All Demo`,
			publicPath: milieu === 'development' ? '' : '/mido-h5-cp/dist',
			openPage: openPage
		}),
		...webpackHtmls,
		new CleanWebpackPlugin(['dist'], { root: APP_PATH })
	]
};

const config = webpackMerge(commonConfig, distConfig);

const compiler = webpack(config);

compiler.run((err, stats) => {
	// const jsonPath = path.join(fileOutputPath, filename);
	// writeFileSync(jsonPath, JSON.stringify(stats.toJson()), 'utf-8');
	const buildInfo = stats.toString({
		colors: true,
		children: false,
		chunks: false,
		modules: false,
		chunkModules: false,
		hash: false,
		version: false,
		entrypoints: false,
		progress: true,
	});
	if (err) {
		console.log(buildInfo);
		return;
	}
	console.log(buildInfo);
	notifier.notify({
		title: 'build',
		message: 'done',
		subtitle: 'build successfully',
		sound: 'Glass',
	});
});
