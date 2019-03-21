## 安装

```vim
npm install mido-h5-cp --save
```

## 依赖,使用模板引擎anima-template,需要在webpack引入atpl-loader
```vim
npm install atpl-loader --save-dev
```
- 配置
```vim
module: {
		rules: [
		{
			test: /\.atpl?$/,
			use: 'atpl-loader'
		}
		]
	},
```

## 依赖less,需要在webpack引入less-loader
```vim
npm install less less-loader --save-dev
```
```vim
module: {
		rules: [
		{
			test: /\.less$/,
			use: [
				'css-loader',
				'less-loader',
			],
		}
		]
	},
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
				{
					"libraryName": "mido-h5-cp",
					"libraryDirectory": "lib/web",
					"camel2DashComponentName": false
				}
		]
	]
}
```
- 使用
```js
import { xxx } from 'mido-h5-cp';
```
## 组件
- [轮播图](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/carousel)
- [上拉刷新下拉加载](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/pullDown)
- [copy](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/copy)
- [弱提示(toast)](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/toast)
- [resize](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/resizer)
- [鼠标滚轮事件](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/rollerSlide)
- [Picker](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/Picker)

## 通用方法
- [获取值](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/findData)
- [fetch](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/fetch)
- [getUrlData](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/geturldata)
- [htmlJson](https://github.com/zyxpz/mido-h5-cp/tree/master/src/web/htmlJson)
