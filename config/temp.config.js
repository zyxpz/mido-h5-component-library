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

		// 文件状态
		const fileStat = fs.statSync(filePath);

		if (fileStat.isDirectory()) {
			const subdir = path.join(dir, file, 'examples');
			cpName = path.join(dir, file, 'Basic');
			getEntryFile(subdir);
		} else if (fileStat.isFile()) {
			// 文件后缀
			const fileExtName = path.extname(filePath);

			if (fileExtName === '.js') {
				entry[cpName] = filePath;
			}

			if (fileExtName === '.html') {
				let filename = '';
				if (milieu === 'production') {
					filename = filePath.replace(/src/, 'dist').replace(/examples\//, '');
				} else {
					filename = cpName;
				}
				openPage[cpName] = `/${cpName}`;
				console.log(filename, cpName);
				html.push(
					new HtmlWebpackPlugin({
						template: filePath,
						inject: 'body',
						filename: filename,
						chunks: [cpName],
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
} = getEntryFile('web');

module.exports = {
	entry: entrys,
	webpackHtmls: webpackHtml,
	openPage: openPages
};
