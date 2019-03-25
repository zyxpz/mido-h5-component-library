## DatePicker

name|value|type
---|:--:|---:
wrap||HTMLDivElement
mode|dateTime|String
labelShow|false|Booleans
onChang||改变回调

```js
import { DatePicker } from 'mido-h5-cp';

new DatePicker({
	wrap: document.querySelector('.app'),
	mode: 'time',
	labelShow: true,
	onChange(val) {
		console.log(val);
	}
});
```

- [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/DatePicker/Basic)