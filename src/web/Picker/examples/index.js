import './index.less';
import('../../../main')
	.then(({ Picker }) => {
		const wrap = document.querySelector('.app');
		const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		// const arr = [
		// 	{
		// 		key: 'num',
		// 		value: [1, 2, 3, 4, 5, 6]
		// 	},
		// 	{
		// 		key: 'num2',
		// 		value: [7, 8, 9, 10, 11]
		// 	}
		// ];

		const picker = new Picker({
			wrap,
			value: arr,
			defaultValue: '5',
			onChange(val) {
				console.log(val);
			}
		});

		picker.init();
	});