// import { RollerSlide } from '../../../main';

import './index.less';

import('../../../main').then(({ RollerSlide }) => {
	const rollerSlide = new RollerSlide({
		wrap: document.querySelector('.wrap')
	});
	
	rollerSlide.init();
});


