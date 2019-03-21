import './index.less';

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const pad = (n) => n < 10 ? `0${n}` : n + '';

const cloneDate = (date) => new Date(+date);

const setMonth = (date, month) => {
	date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
	date.setMonth(month);
};

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';
const ONE_DAY = 24 * 60 * 60 * 1000;

export default class Picker {
	constructor(opts) {
		this.mode = opts.mode || 'deteTime'; // 默认为时间选择器
		this.use12Hours = opts.use12Hours || false; // 小时制
		this.minDate = opts.defaultMinDate || new Date(2000, 1, 1, 0, 0, 0); // 设置默认最小时间
		this.maxDate = opts.defaultMaxDate || new Date(2030, 1, 1, 0, 0, 0); // 设置默认最大时间
		this.label = opts.label || {
			year: '年',
			month: '月',
			day: '日',
			hour: '时',
			minute: '分'
		};


		this.minYear = this.minDate.getFullYear(); // 获取最小年份
		this.maxYear = this.maxDate.getFullYear(); // 获取最大年份
		this.minMonth = this.minDate.getMonth(); // 获取最小月份
		this.maxMonth = this.maxDate.getMonth(); // 获取最大月份
		this.minDay = this.minDate.getDate(); // 获取最小天数
		this.maxDay = this.maxDate.getDate(); // 获取最大天数
		this.minHour = this.minDate.getHours(); // 获取最小小时
		this.maxHour = this.maxDate.getHours(); // 获取最大小时
		this.minMinute = this.minDate.getMinutes(); // 获取最小分钟
		this.maxMinute = this.maxDate.getMinutes(); // 获取最大分钟

		this.minuteStep = 1;
	}

	init = () => {
		this.getDateYear();

		this.render();
	}

	// 获取年
	getDateYear = () => {
		// 所有年份
		const years = [];
		for (let i = this.minYear; i <= this.maxYear; i++) {
			years.push({
				value: i,
				label: `${i}${this.label.year}`
			});
		}

		// // 所有月份
		// const months = [];
		// let minMonth = 0;
		// let maxMonth = 11;
		// if (this.minYear === selYear) {
		// 	minMonth = this.minMonth;
		// }
		// if (this.maxYear === selYear) {
		// 	maxMonth = this.maxMonth;
		// }

		// for (let i = minMonth; i <= maxMonth; i++) {
		// 	months.push({
		// 		value: i,
		// 		label: `${i}${this.label.month}`
		// 	});
		// }

		// // 所有天数
		// const days = [];
		// let minDay = 1;
		// let maxDay = getDaysInMonth(date);

		// if (this.minYear === selYear && this.minMonth === selMonth) {
		// 	minDay = this.minDay;
		// }
		// if (this.maxYear === selYear && this.maxMonth === selMonth) {
		// 	maxDay = maxDateDay;
		// }
		// for (let i = minDay; i <= maxDay; i++) {
		// 	days.push({
		// 		value: i,
		// 		label: `${i}${this.label.day}`
		// 	});
		// }

		this.years = years;
	}

	// 获取每年对应的月份
	getDateMonth = (year) => {

	}

	render() {
		const div = document.createElement('div');
		const app = document.querySelector('.app');
		div.innerHTML = 
		`
			<div class="mido-picker-wrap">
				<div class="mido-picker-year-list J-mido-picker-year"></div>
			</div>
		`;
		app.appendChild(div);
		const yearEle = document.querySelector('.J-mido-picker-year');
		this.years.forEach((item) => {
			console.log(item);
			yearEle.innerHTML += `<div class="mido-picker-year" data-value=${item.value}>${item.label}</div>`;
		});
	}
};
