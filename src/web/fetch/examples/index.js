import { fetch } from '../../../main';
import './index.less';

// get
fetch({
	url: 'http://localhost:9001/some/path.json',
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
		document.querySelector('.J-show').innerHTML = JSON.stringify(d);
	})
	.catch((e) => {
		console.log(e);
	});

// post
fetch({
	url: 'http://localhost:9001/post/path.json',
	data: {
		post: 1
	},
	type: 'post',
	timeout: 3000,
	header: {},
})
	.then((d) => {
		console.log(d);
		// document.querySelector('.J-show').innerHTML = JSON.stringify(d);
	})
	.catch((e) => {
		console.log(e);
	});