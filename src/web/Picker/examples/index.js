import './index.less';
import('../../../main')
	.then(({ Picker }) => {
		const wrap = document.querySelector('.app');
		const picker = new Picker({
			wrap
		});

		picker.init();
	});