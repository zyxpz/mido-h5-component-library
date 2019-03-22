## Picker

name|value|type
---|:--:|---:
wrap||HTMLDivElement
value|[]|Array
defaultValue|''|string
onChang||改变回调
defaultSelectData||默认选中回调

```js
import { Picker } from 'mido-h5-cp';
const wrap = document.querySelector('.app');
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
new Picker({
	wrap,
	value: arr,
	defaultValue: '5',
	onChange(val) {
		console.log(val);
	},
	defaultSelectData(val) {
		console.log(val);
	}
});
```

- [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/Picker/Basic)