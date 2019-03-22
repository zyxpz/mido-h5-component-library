import {
	Picker
} from '../../main';
import './index.less';

export default class MulitPicker {
	constructor(opts) {
		this.wrap = opts.wrap;
		this.value = opts.value;

		this.onChange = opts.onChange || function loop() {};

		this.valueArr = [];
    
		this.render();
	}


	handleChaneValue(val) {

		this.valueArr.forEach((v, i) => {
			Object.keys(v).forEach(k => {
				Object.keys(val).forEach(vk => {
					if (k === vk) {
						v[k] = val[vk];
					}
				});
			});
		});
    
		const arr = [];

		this.valueArr.forEach((item) => {
			for (const key in item) {
				if (Object.hasOwnProperty.call(item, key)) {
					arr.push(item[key]);
				}
			}
		});

		this.handleOnChange(arr);
	}

	handleOnChange(arr) {
		this.onChange(arr);
	}

	render() {

		const self = this;

		const div = document.createElement('div');

		div.className = 'mido-multi-picker';

		this.wrap.appendChild(div);

		this.value.forEach((item, i) => {
			new Picker({
				wrap: div,
				value: item.value,
				key: i + 1,
				defaultValue: item.defaultValue,
				onChange(val) {
					self.handleChaneValue(val);
				},
				defaultSelectData(val) {
					self.valueArr.push(val);
				}
			});
		});

	}
}
