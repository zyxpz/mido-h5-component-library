import {
	MultiPicker
} from '../../main';
import './index.less';

export default class DatePicker {
	constructor(opts) {
		this.wrap = opts.wrap;
		this.mode = opts.mode || 'deteTime'; // 默认为时间选择器
		this.use12Hours = opts.use12Hours || false; // 小时制
		this.minDate = opts.defaultMinDate || new Date(2000, 1, 1, 0, 0, 0); // 设置默认最小时间
		this.maxDate = opts.defaultMaxDate || new Date(2030, 1, 1, 0, 0, 0); // 设置默认最大时间
		this.labelShow = opts.labelShow || false;
		this.label = opts.label || {
			year: '年',
			month: '月',
			day: '日',
			hour: '时',
			minute: '分'
		};
		this.minYear = this.minDate.getFullYear(); // 获取最小年份
		this.maxYear = this.maxDate.getFullYear(); // 获取最大年份

		this.onChange = opts.onChange || function loop() {};

		this.init();
	}

	init = () => {
		const	date = new Date();
		this.render(date);
	}

	// 获取年
	getDateYear = (date) => {
		// 所有年份
		const years = [];
		for (let i = this.minYear; i <= this.maxYear; i++) {
			years.push(
				this.labelShow ? `${i}${this.label.year}` : i
			);
		}
		this.dateYear = date.getFullYear();
		return {
			defaultValue: this.labelShow ? `${date.getFullYear()}${this.label.year}` : `${date.getFullYear()}`,
			value: years
		};
	}

	// 获取每年对应的月份
	getDateMonth = (date) => {
		const months = [];
		for (let i = 0; i < 12; i++) {
			months.push(
				this.labelShow ? `${i + 1}${this.label.month}` : i + 1
			);
		}

		this.dateMonth = date.getMonth() + 1;

		return {
			defaultValue: this.labelShow ? `${date.getMonth() + 1}${this.label.month}` : `${date.getMonth() + 1}`,
			value: months
		};
	}

	// 获取天
	getDateDay = (date) => {
		const days = [];
		const dayLen = new Date(this.dateYear, this.dateMonth, 0).getDate();
		for (let i = 1; i <= dayLen; i++) {
			days.push(
				this.labelShow ? `${i}${this.label.day}` : i
			);
		}

		return {
			defaultValue: this.labelShow ? `${date.getDate()}${this.label.day}` : `${date.getDate()}`,
			value: days
		};
	}

	// 获取小时
	getDateHour = (date) => {
		const hours = [];
		for (let i = 0; i < 24; i++) {
			hours.push(this.labelShow ? `${i}${this.label.hour}` : i);
		}

		return {
			defaultValue: this.labelShow ? `${date.getHours()}${this.label.hour}` : `${date.getHours()}`,
			value: hours
		};
	}

	// 获取分
	getDateMinutes = (date) => {
		const minutes = [];
		for (let i = 0; i < 60; i++) {
			minutes.push(
				this.labelShow ? `${i}${this.label.minute}` : i
			);
		}
		return {
			defaultValue: this.labelShow ? `${date.getMinutes()}${this.label.minute}` : `${date.getMinutes()}`,
			value: minutes
		};
	}

	handleOnChange = (val) => {
		const newVal = [];
		val.forEach(item => {
			const newItem = item.replace(/[\u4e00-\u9fa5]/g, '');
			newVal.push(newItem);
		});

		this.onChange(newVal);
	}
 
	settingData = (date) => [
		this.getDateYear(date),
		this.getDateMonth(date),
		this.getDateDay(date),
		this.getDateHour(date),
		this.getDateMinutes(date)
	]

	render(date) {
		const self = this;
		const div = document.createElement('div');
		div.className = 'mido-deta-picker';
		this.wrap.appendChild(div);
		new MultiPicker({
			wrap: div,
			value: self.settingData(date),
			onChange(val) {
				self.handleOnChange(val);
			}
		});
	}
};
