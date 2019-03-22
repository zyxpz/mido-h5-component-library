## MultiPicker

name|value|type
---|:--:|---:
wrap||HTMLDivElement
value|[]|Array
onChang||改变回调

```js
import { MultiPicker } from 'mido-h5-cp';
const arr = [{
	defaultValue: '3',
	value: [1, 2, 3, 4, 5, 6]
},
{
	defaultValue: '9',
	value: [7, 8, 9, 10, 11]
}
];
new MultiPicker({
	wrap: document.querySelector('.app'),
	value: arr,
	onChange(v) {
		console.log(v);
	}
});
```

- [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/MultiPicker/Basic)