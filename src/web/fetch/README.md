## fetch


- get
```js
import { fetch } from 'mido-h5-cp';
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
```
- post
```js
import { fetch } from 'mido-h5-cp';
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
	})
	.catch((e) => {
		console.log(e);
	});
```
- delete
```js
import { fetch } from 'mido-h5-cp';
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
```

- put
```js
import { fetch } from 'mido-h5-cp';
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
```

## [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/fetch/Basic)