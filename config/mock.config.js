const fs = require('fs-extra');

let mockData = require('../mock.config');

process.on('message', (msg) => {
	fs.watch(`${process.cwd()}/mock.config.js`, {
		encoding: 'utf-8'
	}, () => {
		process.send('mockchange');
	});
});





let contentArr = [];
let getArr = [];
let postArr = [];
let deleteArr = [];
let putArr = [];


module.exports = function (app) {
	for (const key in mockData) {
		let data = {};
		if (Object.hasOwnProperty.call(mockData, key)) {
			const content = mockData[key];

			if (typeof content !== 'function') {
				throw new Error('no function');
			}
			data = {
				path: key,
				content
			};
			contentArr.push(data);
		}
	}

	contentArr.forEach((item) => {
		// get
		if (/get/.test(item.path) || /GET/.test(item.path)) {
			const newKey = item.path.replace(/get /gi, '') || item.path.replace(/GET /gi, '');
			item.path = newKey;
			getArr.push(item);
		}
		// post
		if (/post/.test(item.path) || /POST/.test(item.path)) {
			const newKey = item.path.replace(/POST /gi, '');
			item.path = newKey;
			postArr.push(item);
		}
		// delete
		if (/delete/.test(item.path) || /DELETE/.test(item.path)) {
			const newKey = item.path.replace(/delete /gi, '') || item.path.replace(/DELETE /gi, '');
			item.path = newKey;
			deleteArr.push(item);
		}
		// put
		if (/put/.test(item.path) || /PUT/.test(item.path)) {
			const newKey = item.path.replace(/put /gi, '') || item.path.replace(/PUT /gi, '');
			item.path = newKey;
			putArr.push(item);
		}
	});

	getArr.forEach(item => {
		app.get(`${item.path}`, item.content);
	});

	postArr.forEach(item => {
		app.post(`${item.path}`, item.content);
	});

	deleteArr.forEach(item => {
		app.delete(`${item.path}`, item.content);
	});

	putArr.forEach(item => {
		app.put(`${item.path}`, item.content);
	});
};

