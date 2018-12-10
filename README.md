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