## 获取数据中的值

- data
```json
{
	"a": [{
		"b": {
			"c": [{
				"d": {
					"e": "tmc1"
				}
			}]
		}
	}, {
		"a1": {
			"b": "tmc2"
		}
	}]
}
```
- path
```vim
'a[0].b.c[0].d.e'
```
```js
import { findData } from 'mido-h5-cp';

const dataShow = findData(data, path);

dataShow = 'tmc1';
```

## [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/findData/Basic)