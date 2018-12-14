## fetch

- (目前支持get,post)
 	+ 不完善

- (未完成)
	+ 1、请求头问题。
	+ 2、jsonp问题。
	+ 3、dataType
	+ 4、cache

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