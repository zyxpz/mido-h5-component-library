## 安装

```vim
npm install mido-h5-cp --save
```

## 使用方式 => 按需加载，需要安装 `babel-plugin-import`
```vim
npm install babel-plugin-import --save-dev
```
- 配置`.babelrc`
```vim
{
	"plugins": [
		[
			"import",
			[
				{
					"libraryName": "mido-h5-cp",
					"libraryDirectory": "lib/"
				}
			]
		]
	]
}
```
- 使用
```js
import { Carousel } from 'mido-h5-cp';
```
## 组件
- [轮播图](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/carousel)
- [上拉刷新下拉加载](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/pullDown)
- [copy](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/copy)
- [若提示(toast)](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/toast)

## 通用方法
- [获取值](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/findData)
- [fetch](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/fetch)
- [getUrlData](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/getUrlData)