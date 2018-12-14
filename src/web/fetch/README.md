## fetch

- (目前支持get,post)
 	+ 不完善

- (未完成)
	+ cache

```js
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

## [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/fetch/Basic)