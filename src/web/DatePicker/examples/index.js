import './index.less';
import('../../../main')
	.then(({
		DatePicker
	}) => {
		new DatePicker({
			wrap: document.querySelector('.app'),
			mode: 'time',
			labelShow: true,
			onChange(val) {
				console.log(val);
			}
		});
	});
