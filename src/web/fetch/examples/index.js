import { fetch } from '../../../main';
import './index.less';

fetch({
	url: 'https://api.douban.com/v2/book/search',
	data: {
		q: 'javascript',
		count: 1
	},
	type: 'get',
	timeout: 3000,
	header: {},
	dataType: 'jsonp',
	callback: 'jsonCallback'
})
	.then((d) => {
		console.log(d);
		document.querySelector('.J-show').innerHTML = JSON.stringify(d);
	})
	.catch((e) => {
		console.log(e);
	});