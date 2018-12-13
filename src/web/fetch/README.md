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
	url: 'http://localhost:9001/some/path.json',
	data: {
		m: 1,
		x: 2,
		l: 3
	},
	type: "get"
})
	.then((d) => {
		console.log(d);
	})
	.catch((e) => {
		console.log(e);
	});
```