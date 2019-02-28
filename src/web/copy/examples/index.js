import './index.less';

import('../../../main')
	.then(({ copy }) => {

		document.querySelector('.J-btn').addEventListener('click', () => {
			copy({
				copyWrap: 'J-content',
				dataType: 'value'
			});
		});


		document.querySelector('.J-inner-btn').addEventListener('click', () => {
			copy({
				copyWrap: 'J-content-innertext',
				dataType: 'innerText'
			});
		});
	});
