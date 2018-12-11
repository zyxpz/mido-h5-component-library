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
## [demo](https://zyxpz.github.io/mido-h5-cp/dist/index.html)

```js
import { carousel } from 'mido-h5-cp';
```
## 组件
- [轮播图](https://zyxpz.github.io/mido-h5-cp/dist/web/carousel/Basic)
- [上拉刷新下拉加载](https://zyxpz.github.io/mido-h5-cp/dist/web/pullDown/Basic)

## 通用方法
- []