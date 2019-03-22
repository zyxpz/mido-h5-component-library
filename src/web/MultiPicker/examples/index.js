import './index.less';
import('../../../main')
	.then(({
		MultiPicker
	}) => {
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
	});
