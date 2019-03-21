## Picker
- 不完善

```js
import { Picker } from 'mido-h5-cp';
const wrap = document.querySelector('.app');
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const picker = new Picker({
	wrap,
	value: arr,
	defaultValue: '5',
	onChange(val) {
		console.log(val);
	}
});

picker.init();
```

- [效果](https://zyxpz.github.io/mido-h5-cp/dist/web/Picker/Basic)