import { fetch } from '../../../main';
import './index.less';

// get
fetch({
	url: 'http://localhost:9001/some/get.json',
	data: {
		get: 1,
		t: 2
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