import { fetch } from '../../../main';
import './index.less';

// get
fetch({
	url: 'http://localhost:9001/some/get.json',
	data: {
		get: 1,
		t: 2,
		c: 3
	},
	type: 'get',
	timeout: 3000,
	header: {},
})
	.then((d) => {
		console.log(d);
		document.querySelector('.J-show-get').innerHTML = JSON.stringify(d);
	})
	.catch((e) => {
		console.log(e);
	});

// post
fetch({
	url: 'http://localhost:9001/some/post.json',
	data: {
		post: 1
	},
	type: 'post',
	timeout: 3000,
	header: {},
})
	.then((d) => {
		console.log(d);
		document.querySelector('.J-show-post').innerHTML = JSON.stringify(d);
	})
	.catch((e) => {
		console.log(e);
	});

// delete
fetch({
	url: 'http://localhost:9001/some/delete.json',
	data: {
		post: 1
	},
	type: 'delete',
	timeout: 3000,
	header: {},
})
	.then((d) => {
		console.log(d);
		document.querySelector('.J-show-delete').innerHTML = JSON.stringify(d);
	})
	.catch((e) => {
		console.log(e);
	});

// put
fetch({
	url: 'http://localhost:9001/some/put.json',
	data: {
		post: 1
	},
	type: 'put',
	timeout: 3000,
	header: {},
})
	.then((d) => {
		console.log(d);
		document.querySelector('.J-show-put').innerHTML = JSON.stringify(d);
	})
	.catch((e) => {
		console.log(e);
	});


// test get
fetch({
	url: 'http://localhost:9001/some/test/get.json',
	data: {
		get: 1,
		t: 2
	},
	type: 'get',
	timeout: 3000,
	header: {},
})
	.then((d) => {
		console.log(d, 'test');
		// document.querySelector('.J-show-get').innerHTML = JSON.stringify(d);
	})
	.catch((e) => {
		console.log(e);
	});

fetch({
	url: 'http://t.weather.sojson.com/api/weather/city/101030100',
	data: {
		"_id": 379,
		"id": 382,
		"pid": 30,
		"city_code": "101210101",
		"city_name": "杭州"
	},
	type: 'get',
	header: {
	
	},
})
	.then((d) => {
		console.log(d);
		fetch({
			url: 'https://oapi.dingtalk.com/robot/send?access_token=a272f6dec733fda4003ae4efd6ec6ea774e75b779b2f1f41d6748685870c2d11',
			type: 'post',
			data: {
				"msgtype": "text",
				"text": {
					"content": "@18203638867 测试"
				},
				"at": {
					"atMobiles": [
						"18203638867"
					], 
					"isAtAll": false
				}
			},
			header: {}
		})
			.then((d) => {
				console.log(d);
			})
			.catch((e) => {
				console.log(e);
			});
		// $.ajax({
		// 	url: 'https://oapi.dingtalk.com/robot/send?access_token=a272f6dec733fda4003ae4efd6ec6ea774e75b779b2f1f41d6748685870c2d11',
		// 	data: {},
		// 	type: 'POST',
		// 	success(d) {
		// 		console.log(d);
		// 	},
		// 	error(e) {
		// 		console.log(e);
		// 	}
		// });
	})
	.catch((e) => {
		console.log(e);
	});