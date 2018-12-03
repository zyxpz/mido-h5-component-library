const fs = require('fs-extra');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
	path,
	APP_PATH,
	myip,
	milieu,
	commonConfig,
	port,
} = require('./webpack.common.config');

let entry = {};

const html = [];

let openPage = {};

// 组件名
let cpName = '';

const getEntryFile = (dir) => {
	const directory = path.join(APP_PATH, 'src', dir);

	fs.readdirSync(directory, {
		encoding: 'utf-8'
	}).forEach((file) => {
		// 文件路径
		const filePath = path.join(directory, file);

		const fileStat = fs.statSync(filePath);

		// console.log(filePath);

		if (fileStat.isDirectory() && !fileStat.isFile()) {
			const subdir = path.join(dir, file);
			cpName = file;
			console.log(cpName, subdir, filePath);
			getEntryFile(subdir);
		} else if (fileStat.isFile() && !fileStat.isDirectory()) {
			// 文件后缀
			const fileExtName = path.extname(filePath);

			if (fileExtName === '.js') {
				entry[cpName] = filePath;
			}

			if (fileExtName === '.html') {
				openPage[cpName] = cpName;
				html.push(
					new HtmlWebpackPlugin({
						template: filePath,
						inject: 'body',
						filename: cpName,
						chunks: [cpName],
						publicPath: '',
					})
				);
			}
		}

	});

	return {
		entrys: entry,
		webpackHtml: html,
		openPages: openPage,
	};

};

const {
	entrys,
	webpackHtml,
	openPages
} = getEntryFile('pages/components');

module.exports = {
	entry: entrys,
	webpackHtmls: webpackHtml,
	openPage: openPages
};
